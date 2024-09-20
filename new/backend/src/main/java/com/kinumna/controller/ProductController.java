package com.kinumna.controller;
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
import com.kinumna.model.Product;
import com.kinumna.payload.requests.CreateProductRequestDTO;
import com.kinumna.payload.responses.ProductDTO;
import com.kinumna.service.ProductService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping(value = "",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> createProduct(
        @RequestParam("product") String productRequest,
        @RequestParam(value = "images", required = false) List<MultipartFile> images) {

            ObjectMapper mapper = new ObjectMapper();
            
            try {
                CreateProductRequestDTO req = mapper.readValue(productRequest, CreateProductRequestDTO.class);
                ProductDTO createdProduct = productService.createProductWithVariants(req, images);
                return ResponseEntity.ok(createdProduct);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAll(){
        return ResponseEntity.ok(this.productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable int id){
        return ResponseEntity.ok(this.productService.getById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getByCategory(@PathVariable int categoryId){
        return ResponseEntity.ok(this.productService.getByCategory(categoryId));
    }

    @GetMapping("/sale/{saleId}")
    public ResponseEntity<List<Product>> getBySale(@PathVariable int saleId){
        return ResponseEntity.ok(this.productService.getBySale(saleId));
    }

    @PutMapping(value = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDTO> update(@PathVariable int id, @RequestParam("product") String productRequest,
        @RequestParam(value = "images", required = false) List<MultipartFile> images) {

        ObjectMapper mapper = new ObjectMapper();
        
        try {
            CreateProductRequestDTO req = mapper.readValue(productRequest, CreateProductRequestDTO.class);
            req.setProductId(id);
            ProductDTO createdProduct = productService.createProductWithVariants(req, images);
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.productService.delete(id);
        return ResponseEntity.ok("Product Deleted Successfully");
    }
}