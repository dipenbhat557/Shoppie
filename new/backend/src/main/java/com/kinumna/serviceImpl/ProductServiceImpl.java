package com.kinumna.serviceImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Brand;
import com.kinumna.model.Category;
import com.kinumna.model.Image;
import com.kinumna.model.Product;
import com.kinumna.model.ProductOption;
import com.kinumna.model.ProductOptionGroup;
import com.kinumna.model.ProductVariant;
import com.kinumna.model.Store;
import com.kinumna.model.Wishlist;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.CreateProductRequestDTO;
import com.kinumna.payload.requests.OptionGroupDTO;
import com.kinumna.payload.responses.ProductDTO;
import com.kinumna.repo.BrandRepo;
import com.kinumna.repo.CategoryRepo;
import com.kinumna.repo.ImageRepo;
import com.kinumna.repo.ProductOptionGroupRepo;
import com.kinumna.repo.ProductOptionRepo;
import com.kinumna.repo.ProductRepo;
import com.kinumna.repo.ProductVariantRepo;
import com.kinumna.repo.SaleRepo;
import com.kinumna.repo.StoreRepo;
import com.kinumna.repo.WishlistRepo;
import com.kinumna.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private CategoryRepo categoryRepository;

    @Autowired
    private BrandRepo brandRepository;

    @Autowired
    private StoreRepo storeRepository;

    @Autowired
    private ProductOptionGroupRepo productOptionGroupRepository;

    @Autowired
    private ProductOptionRepo productOptionRepository;

    @Autowired
    private ProductVariantRepo productVariantRepository;

    @Autowired
    private ImageRepo imageRepository;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private WishlistRepo wishlistRepo;

    @Override
    @Transactional
    public ProductDTO createProductWithVariants(CreateProductRequestDTO request, List<MultipartFile> images) {
        Product product = this.productRepository.findById(request.getProductId()).orElse(new Product());

        product.setName(request.getName());
        product.setDescription(request.getDescription());

        if (request.getCategoryId() > 0) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        if (request.getBrandId() > 0) {
            Brand brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
            product.setBrand(brand);
        }

        productRepository.save(product);

        List<ProductOption> selectedProductOptions = new ArrayList<>();
        for (OptionGroupDTO optionGroup : request.getOptionGroups()) {
            ProductOptionGroup productOptionGroup = productOptionGroupRepository.findByName(optionGroup.getOptionGroupName())
                    .orElseGet(() -> {
                        ProductOptionGroup newGroup = new ProductOptionGroup();
                        newGroup.setName(optionGroup.getOptionGroupName());
                        return productOptionGroupRepository.save(newGroup);
                    });

            ProductOption productOption = productOptionRepository.findByNameAndProductOptionGroup(optionGroup.getOptionName(), productOptionGroup)
                    .orElseGet(() -> {
                        ProductOption newOption = new ProductOption();
                        newOption.setName(optionGroup.getOptionName());
                        newOption.setProductOptionGroup(productOptionGroup);
                        return productOptionRepository.save(newOption);
                    });

            selectedProductOptions.add(productOption);
        }

        ProductVariant productVariant = new ProductVariant();
        productVariant.setProduct(product);

        if (request.getStoreId() > 0) {
            Store store = storeRepository.findById(request.getStoreId())
                    .orElseThrow(() -> new ResourceNotFoundException("Store not found"));
            productVariant.setStore(store);
        }

        productVariant.setPrice(request.getPrice());
        productVariant.setStock(request.getStock());
        productVariant.setProductOptions(selectedProductOptions);
        productVariant.setSku(generateSku(product, selectedProductOptions));

        if (images != null && !images.isEmpty()) {
            List<Image> variantImages = images.stream()
                    .map(img -> {
                        try {
                            Image image = new Image();
                            image.setImage(img.getBytes());
                            image.setProductVariant(productVariant);
                            return imageRepository.save(image);
                        } catch (Exception e) {
                            throw new RuntimeException("Error processing image", e);
                        }
                    }).collect(Collectors.toList());

            productVariant.setImages(variantImages);
        }

        productVariantRepository.save(productVariant);

        return this.responseFromObject.mapToProductDTO(product, Arrays.asList(productVariant));
    }

    private String generateSku(Product product, List<ProductOption> options) {
        StringBuilder sku = new StringBuilder(product.getName());
        for (ProductOption option : options) {
            sku.append("-").append(option.getName());
        }
        return sku.toString().toUpperCase().replaceAll(" ", "_");
    }

	@Override
	public List<Product> getAll() {
        return this.productRepository.findAll();
	}

	@Override
	public Product getById(int id) {
		return this.productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("product not found"));
	}

    @Override
    public List<Product> getByCategory(int categoryId){
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category not found"));
        return this.productRepository.findByCategory(category);
    }

    @Override
    public List<Product> getBySale(int saleId){
        return this.saleRepo.findById(saleId).orElseThrow(()->new ResourceNotFoundException("sale not found")).getProducts();
    }

    @Override
    public List<Product> getByWishlist(int wishlistId){
        Wishlist wishlist = this.wishlistRepo.findById(wishlistId).orElseThrow(()->new ResourceNotFoundException("wishlist not found"));
        return wishlist.getProducts();
    }

	@Override
	public ProductDTO update(CreateProductRequestDTO request, List<MultipartFile> images) {
		Product product = this.productRepository.findById(request.getProductId()).orElse(new Product());

        product.setName(request.getName());
        product.setDescription(request.getDescription());

        if (request.getCategoryId() > 0) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        if (request.getBrandId() > 0) {
            Brand brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
            product.setBrand(brand);
        }

        productRepository.save(product);

        List<ProductOption> selectedProductOptions = new ArrayList<>();
        for (OptionGroupDTO optionGroup : request.getOptionGroups()) {
            ProductOptionGroup productOptionGroup = productOptionGroupRepository.findByName(optionGroup.getOptionGroupName())
                    .orElseGet(() -> {
                        ProductOptionGroup newGroup = new ProductOptionGroup();
                        newGroup.setName(optionGroup.getOptionGroupName());
                        return productOptionGroupRepository.save(newGroup);
                    });

            ProductOption productOption = productOptionRepository.findByNameAndProductOptionGroup(optionGroup.getOptionName(), productOptionGroup)
                    .orElseGet(() -> {
                        ProductOption newOption = new ProductOption();
                        newOption.setName(optionGroup.getOptionName());
                        newOption.setProductOptionGroup(productOptionGroup);
                        return productOptionRepository.save(newOption);
                    });

            selectedProductOptions.add(productOption);
        }

        ProductVariant productVariant = new ProductVariant();
        productVariant.setProduct(product);

        if (request.getStoreId() > 0) {
            Store store = storeRepository.findById(request.getStoreId())
                    .orElseThrow(() -> new ResourceNotFoundException("Store not found"));
            productVariant.setStore(store);
        }

        productVariant.setPrice(request.getPrice());
        productVariant.setStock(request.getStock());
        productVariant.setProductOptions(selectedProductOptions);
        productVariant.setSku(generateSku(product, selectedProductOptions));

        if (images != null && !images.isEmpty()) {
            List<Image> variantImages = images.stream()
                    .map(img -> {
                        try {
                            Image image = new Image();
                            image.setImage(img.getBytes());
                            image.setProductVariant(productVariant);
                            return imageRepository.save(image);
                        } catch (Exception e) {
                            throw new RuntimeException("Error processing image", e);
                        }
                    }).collect(Collectors.toList());

            productVariant.setImages(variantImages);
        }

        productVariantRepository.save(productVariant);

        return this.responseFromObject.mapToProductDTO(product, Arrays.asList(productVariant));
    
	}

	@Override
	public void delete(int id) {
		this.productRepository.deleteById(id);
	}
}
