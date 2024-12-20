package com.kinumna.serviceImpl;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Image;
import com.kinumna.model.Product;
import com.kinumna.model.ProductOption;
import com.kinumna.model.ProductVariant;
import com.kinumna.model.Sale;
import com.kinumna.model.Store;
import com.kinumna.payload.ProductVariantSpecification;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.ProductVariantFilter;
import com.kinumna.payload.requests.ProductVariantInput;
import com.kinumna.payload.responses.ProductVariantDTO;
import com.kinumna.repo.ProductRepo;
import com.kinumna.repo.ImageRepo;
import com.kinumna.repo.ProductOptionRepo;
import com.kinumna.repo.ProductVariantRepo;
import com.kinumna.repo.SaleRepo;
import com.kinumna.repo.StoreRepo;
import com.kinumna.service.ProductService;
import com.kinumna.service.ProductVariantService;

@Service
public class ProductVariantServiceImpl implements ProductVariantService {

    @Autowired
    private ProductVariantRepo productVariantRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ProductOptionRepo productOptionRepo;

    @Autowired
    private StoreRepo storeRepo;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Autowired
    private ImageRepo imageRepo;

    @Autowired
    private ProductService productService;

    @Autowired
    private SaleRepo saleRepo;

    @Override
    public ProductVariantDTO create(ProductVariantInput input, List<MultipartFile> images) {
        // Find the related product and store entities
        Product product = productRepo.findById(input.getProductId())
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Store store = storeRepo.findById(input.getStoreId())
            .orElseThrow(() -> new ResourceNotFoundException("Store not found"));

        // Create a new ProductVariant instance
        ProductVariant variant = new ProductVariant();
        variant.setPrice(input.getPrice());
        variant.setStock(input.getStock());
        variant.setProduct(product);
        variant.setStore(store);

        // Handle Product Options
        List<ProductOption> productOptions = productOptionRepo.findAllById(input.getProductOptionId());
        variant.setProductOptions(productOptions);

        // Generate SKU (you can implement logic to generate SKU based on certain conditions)
        variant.setSku(generateSku(product, productOptions));

        // Handle image saving (optional, can be done using a utility method)
        variant.setImages(mapImagesToVariant(images, variant));

        // Save the variant to the database
        ProductVariant savedVariant = productVariantRepo.save(variant);

        // Map the saved entity to DTO
        return responseFromObject.mapToVariantDTO(savedVariant);
    }

    @Override
    public ProductVariantDTO getById(int id) {
        ProductVariant variant = productVariantRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product variant not found"));

        return responseFromObject.mapToVariantDTO(variant);
    }

    @Override
    public List<ProductVariantDTO> getAll() {
        List<ProductVariant> variants = productVariantRepo.findAll();
        return variants.stream()
            .map(responseFromObject::mapToVariantDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<ProductVariantDTO> getByCategory(int categoryId) {
        // Step 1: Retrieve all products by category
        List<Product> products = this.productService.getByCategory(categoryId);

        // Step 2: Collect all product variants from the retrieved products using productVariantRepo
        List<ProductVariant> variants = products.stream()
            .flatMap(product -> this.productVariantRepo.findByProduct(product).stream())  // Extract variants from each product
            .collect(Collectors.toList());

        // Step 3: Map each ProductVariant to ProductVariantDTO and return the list
        return variants.stream()
            .map(responseFromObject::mapToVariantDTO)  // Convert each variant to DTO
            .collect(Collectors.toList());
    }


    @Override
    public List<ProductVariantDTO> getByStore(int storeId) {
        Store store = this.storeRepo.findById(storeId).orElseThrow(()->new ResourceNotFoundException("store not found"));
        List<ProductVariant> variants = productVariantRepo.findByStore(store);
        return variants.stream()
            .map(responseFromObject::mapToVariantDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<ProductVariantDTO> getByProduct(int productId) {
        Product product = this.productService.getById(productId);
        List<ProductVariant> variants = productVariantRepo.findByProduct(product);
        return variants.stream()
            .map(responseFromObject::mapToVariantDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<ProductVariantDTO> getBySale(int saleId){
        Sale sale = this.saleRepo.findById(saleId).orElseThrow(()->new ResourceNotFoundException("sale not found"));

        List<Product> products = sale.getProducts();

        List<ProductVariant> variants = products.stream().flatMap(product -> this.productVariantRepo.findByProduct(product).stream()).collect(Collectors.toList());
        
        List<ProductVariantDTO> res = variants.stream().map(variant -> this.responseFromObject.mapToVariantDTO(variant)).collect(Collectors.toList());

        return res;
    }

    @Override
    public List<ProductVariantDTO> filter(ProductVariantFilter filter) {
        // Use Specification to dynamically build the query based on filter parameters
        Specification<ProductVariant> spec = ProductVariantSpecification.buildSpecification(filter);
        List<ProductVariant> variants = productVariantRepo.findAll(spec);
        
        return variants.stream()
            .map(responseFromObject::mapToVariantDTO)
            .collect(Collectors.toList());
    }

    @Override
    public ProductVariantDTO update(int id, ProductVariantInput input, List<MultipartFile> images) {
        ProductVariant variant = productVariantRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product variant not found"));

        // Update variant properties
        variant.setPrice(input.getPrice());
        variant.setStock(input.getStock());

        // Update Product and Store
        Product product = productRepo.findById(input.getProductId())
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        Store store = storeRepo.findById(input.getStoreId())
            .orElseThrow(() -> new ResourceNotFoundException("Store not found"));

        variant.setProduct(product);
        variant.setStore(store);

        // Update product options
        List<ProductOption> productOptions = productOptionRepo.findAllById(input.getProductOptionId());
        variant.setProductOptions(productOptions);

        // Update SKU
        variant.setSku(generateSku(product, productOptions));

        // Update images (optional)
        variant.setImages(mapImagesToVariant(images, variant));

        ProductVariant updatedVariant = productVariantRepo.save(variant);

        return responseFromObject.mapToVariantDTO(updatedVariant);
    }

    @Override
    public void delete(int id) {
        ProductVariant variant = productVariantRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product variant not found"));
        productVariantRepo.delete(variant);
    }

    private String generateSku(Product product, List<ProductOption> options) {
        StringBuilder sku = new StringBuilder(product.getName());
        for (ProductOption option : options) {
            sku.append("-").append(option.getName());
        }
        return sku.toString().toUpperCase().replaceAll(" ", "_");
    }

    private List<Image> mapImagesToVariant(List<MultipartFile> images, ProductVariant variant) {
        // Implement logic to map images to Image entity and associate them with the variant
        return images.stream().map(image -> {
            Image img = new Image();
            try {
                img.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            img.setProductVariant(variant);
            img =this.imageRepo.save(img);
            return img;
        }).collect(Collectors.toList());
    }
}
