package com.kinumna.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kinumna.model.Product;
import com.kinumna.payload.requests.CreateProductRequestDTO;
import com.kinumna.payload.responses.ProductDTO;

public interface ProductService {
    public ProductDTO createProductWithVariants(CreateProductRequestDTO request, List<MultipartFile> images);
    public List<Product> getAll();
    public Product getById(int id);
    public ProductDTO update( CreateProductRequestDTO request, List<MultipartFile> images);
    public void delete(int id);
}