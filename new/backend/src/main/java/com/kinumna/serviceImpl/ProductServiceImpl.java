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
import com.kinumna.payload.requests.CreateProductRequestDTO;
import com.kinumna.payload.requests.OptionGroupDTO;
import com.kinumna.payload.responses.ImageResponse;
import com.kinumna.payload.responses.ProductDTO;
import com.kinumna.payload.responses.ProductOptionDTO;
import com.kinumna.payload.responses.ProductVariantDTO;
import com.kinumna.repo.BrandRepo;
import com.kinumna.repo.CategoryRepo;
import com.kinumna.repo.ImageRepo;
import com.kinumna.repo.ProductOptionGroupRepo;
import com.kinumna.repo.ProductOptionRepo;
import com.kinumna.repo.ProductRepo;
import com.kinumna.repo.ProductVariantRepo;
import com.kinumna.repo.StoreRepo;
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

    @Override
    @Transactional
    public ProductDTO createProductWithVariants(CreateProductRequestDTO request, List<MultipartFile> images) {
        log.info("inside service with req {}",request);
        // 1. Check if Product exists, otherwise create a new one
        Product product = this.productRepository.findById(request.getProductId()).orElse(new Product());

        // Set the product name and description from the request
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        log.info("got product witn {}",product);

        // 2. Set Category if provided
        if (request.getCategoryId() > 0) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        // 3. Set Brand if provided
        if (request.getBrandId() > 0) {
            Brand brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
            product.setBrand(brand);
        }

        // Save the product first to ensure we have an ID if it's a new product
        productRepository.save(product);
        log.info("product created");

        // 4. Handle ProductOptionGroups and ProductOptions
        List<ProductOption> selectedProductOptions = new ArrayList<>();
        for (OptionGroupDTO optionGroup : request.getOptionGroups()) {
            // Find or create ProductOptionGroup
            ProductOptionGroup productOptionGroup = productOptionGroupRepository.findByName(optionGroup.getOptionGroupName())
                    .orElseGet(() -> {
                        ProductOptionGroup newGroup = new ProductOptionGroup();
                        newGroup.setName(optionGroup.getOptionGroupName());
                        return productOptionGroupRepository.save(newGroup);
                    });

            // Find or create ProductOption within the group
            ProductOption productOption = productOptionRepository.findByNameAndProductOptionGroup(optionGroup.getOptionName(), productOptionGroup)
                    .orElseGet(() -> {
                        ProductOption newOption = new ProductOption();
                        newOption.setName(optionGroup.getOptionName());
                        newOption.setProductOptionGroup(productOptionGroup);
                        return productOptionRepository.save(newOption);
                    });

            selectedProductOptions.add(productOption);
        }

        log.info("selected product options are {}",selectedProductOptions);

        // 5. Create Product Variant
        ProductVariant productVariant = new ProductVariant();
        productVariant.setProduct(product);

        // 6. Set Store if provided
        if (request.getStoreId() > 0) {
            Store store = storeRepository.findById(request.getStoreId())
                    .orElseThrow(() -> new ResourceNotFoundException("Store not found"));
            productVariant.setStore(store);
        }

        // Set dynamic price and stock from the request
        productVariant.setPrice(request.getPrice());
        productVariant.setStock(request.getStock());
        productVariant.setProductOptions(selectedProductOptions);
        productVariant.setSku(generateSku(product, selectedProductOptions));

        log.info("product variant creatd {}",productVariant);
        // 7. Handle Images
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
        log.info("added image with {}",productVariant);

        // Save the updated product variant with images
        productVariantRepository.save(productVariant);
        log.info("saved after adding image");

        // 8. Return the created product and its variants
        return mapToProductDTO(product, Arrays.asList(productVariant));
    }

    private String generateSku(Product product, List<ProductOption> options) {
        StringBuilder sku = new StringBuilder(product.getName());
        for (ProductOption option : options) {
            sku.append("-").append(option.getName());
        }
        return sku.toString().toUpperCase().replaceAll(" ", "_");
    }

    // Method to map Product and ProductVariant entities to DTOs
    private ProductDTO mapToProductDTO(Product product, List<ProductVariant> productVariants) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setProductId(product.getProductId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());

        if (product.getCategory() != null) {
            productDTO.setCategoryId(product.getCategory().getCategoryId());
            productDTO.setCategoryName(product.getCategory().getCategoryName());
        }

        if (product.getBrand() != null) {
            productDTO.setBrandId(product.getBrand().getBrandId());
            productDTO.setBrandName(product.getBrand().getName());
        }

        List<ProductVariantDTO> variantDTOs = productVariants.stream()
                .map(this::mapToVariantDTO)
                .collect(Collectors.toList());
        productDTO.setVariants(variantDTOs);

        return productDTO;
    }

    // Method to map ProductVariant entity to DTO
    private ProductVariantDTO mapToVariantDTO(ProductVariant variant) {
        ProductVariantDTO variantDTO = new ProductVariantDTO();
        variantDTO.setVariantId(variant.getVariantId());
        variantDTO.setSku(variant.getSku());
        variantDTO.setPrice(variant.getPrice());
        variantDTO.setStock(variant.getStock());
        variantDTO.setProductId(variant.getProduct().getProductId());
        variantDTO.setProductName(variant.getProduct().getName());

        if (variant.getStore() != null) {
            variantDTO.setStoreId(variant.getStore().getId());
            variantDTO.setStoreName(variant.getStore().getName());
        }

        List<ProductOptionDTO> optionDTOs = variant.getProductOptions().stream()
                .map(option -> new ProductOptionDTO(option.getId(), option.getName(),
                        option.getProductOptionGroup().getId(), option.getProductOptionGroup().getName()))
                .collect(Collectors.toList());
        variantDTO.setProductOptions(optionDTOs);

        List<ImageResponse> imageDTOs = variant.getImages().stream()
                .map(image -> new ImageResponse(image.getId(), image.getImage()))
                .collect(Collectors.toList());
        variantDTO.setImages(imageDTOs);

        return variantDTO;
    }
}
