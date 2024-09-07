package com.kinumna.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kinumna.payload.requests.CreateProductRequestDTO;
import com.kinumna.payload.responses.ProductDTO;

public interface ProductService {
    public ProductDTO createProductWithVariants(CreateProductRequestDTO request, List<MultipartFile> images);
}