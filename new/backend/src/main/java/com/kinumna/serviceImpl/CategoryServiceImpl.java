package com.kinumna.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Category;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.CategoryInput;
import com.kinumna.payload.responses.CategoryResponse;
import com.kinumna.repo.CategoryRepo;
import com.kinumna.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Override
    public CategoryResponse create(CategoryInput input, MultipartFile file) {
        Category category = new Category();

        category = this.objectFromInput.getCategory(category, input, file);

        category = this.categoryRepo.save(category);

        return this.responseFromObject.getCategoryResponse(category);
    }

    @Override
    public CategoryResponse getById(int id) {
        return this.responseFromObject.getCategoryResponse(this.categoryRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("category not found")));
    }

    @Override
    public List<CategoryResponse> getAll() {
        return this.categoryRepo.findAll()
            .stream().map(c -> 
                this.responseFromObject.getCategoryResponse(c))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse update(int id, CategoryInput input, MultipartFile file) {
        Category category = this.categoryRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("category not found"));

        if(category != null){
            category = this.objectFromInput.getCategory(category, input, file);
            category = this.categoryRepo.save(category);
            return this.responseFromObject.getCategoryResponse(category);
        }

        return null;
    }

    @Override
    public void delete(int id) {
        this.categoryRepo.deleteById(id);
    }
    
}
