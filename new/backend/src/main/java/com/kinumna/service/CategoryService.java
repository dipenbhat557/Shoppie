package com.kinumna.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kinumna.payload.requests.CategoryInput;
import com.kinumna.payload.responses.CategoryResponse;

public interface CategoryService {
    public CategoryResponse create(CategoryInput input, MultipartFile file);
   public CategoryResponse getById(int id); 
   public List<CategoryResponse> getAll();
   public CategoryResponse update(int id, CategoryInput input, MultipartFile file);
   public void delete(int id);
}
