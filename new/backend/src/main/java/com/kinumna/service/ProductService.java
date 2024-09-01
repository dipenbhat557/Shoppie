package com.kinumna.service;

import java.util.List;

import com.kinumna.model.Product;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Integer productId);
    Product createProduct(Product product);
    Product updateProduct(Integer productId, Product product);
    void deleteProduct(Integer productId);
}