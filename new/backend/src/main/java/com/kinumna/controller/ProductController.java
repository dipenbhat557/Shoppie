package com.kinumna.controller;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Controller;

import com.kinumna.model.Product;
import com.kinumna.payload.ProductInput;
import com.kinumna.service.ProductService;

import java.util.List;
import java.util.Optional;

@Controller
public class ProductController {

    @Autowired
    private ProductService productService;

    @QueryMapping
    public List<Product> products() {
        return productService.getAllProducts();
    }

    @QueryMapping
    public Optional<Product> product(@Argument Long id) {
        return productService.getProductById(id);
    }

    @MutationMapping
    public Product createProduct(@Argument ProductInput input) {
        Product product = new Product();
        product.setName(input.getName());
        product.setPrice(input.getPrice());
        product.setDescription(input.getDescription());
        return productService.saveProduct(product);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument ProductInput input) {
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(input.getName());
        product.setPrice(input.getPrice());
        product.setDescription(input.getDescription());
        return productService.saveProduct(product);
    }

    @MutationMapping
    public String deleteProduct(@Argument Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}