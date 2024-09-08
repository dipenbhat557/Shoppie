package com.kinumna.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kinumna.payload.requests.ProductVariantFilter;
import com.kinumna.payload.requests.ProductVariantInput;
import com.kinumna.payload.responses.ProductVariantDTO;

public interface ProductVariantService {
    ProductVariantDTO create(ProductVariantInput input, List<MultipartFile> images);
    ProductVariantDTO getById(int id);
    List<ProductVariantDTO> getAll();
    List<ProductVariantDTO> getByCategory(int categoryId);
    List<ProductVariantDTO> getByStore(int storeId);
    List<ProductVariantDTO> getByProduct(int productId);
    ProductVariantDTO update(int id, ProductVariantInput input, List<MultipartFile> images);
    void delete(int id);
    List<ProductVariantDTO> filter(ProductVariantFilter filter);
}
