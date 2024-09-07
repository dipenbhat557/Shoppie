package com.kinumna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kinumna.payload.requests.CategoryInput;
import com.kinumna.payload.responses.CategoryResponse;
import com.kinumna.service.CategoryService;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
   
    @Autowired
    private CategoryService categoryService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryResponse> create(@RequestParam("input") String categoryJson, @RequestParam("file") MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();

        try {
            CategoryInput input = mapper.readValue(categoryJson, CategoryInput.class);
            return ResponseEntity.ok(this.categoryService.create(input, file));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAll(){
        return ResponseEntity.ok(this.categoryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable int id){
        return ResponseEntity.ok(this.categoryService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(@PathVariable int id, @RequestParam("input") String categoryJson, @RequestParam("file") MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();

        try {
            CategoryInput input = mapper.readValue(categoryJson, CategoryInput.class);
            return ResponseEntity.ok(this.categoryService.update(id,input, file));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.categoryService.delete(id);
        return ResponseEntity.ok("Deleted successfully");
    }
}
