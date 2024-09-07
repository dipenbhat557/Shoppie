package com.kinumna.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
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
                    log.info("inside controller");
                    log.info("product req i s {} ",productRequest);
                    CreateProductRequestDTO req = mapper.readValue(productRequest, CreateProductRequestDTO.class);
                    log.info("create prod req is {} ", req);
                    // Call the service layer to create the product with variants
                    ProductDTO createdProduct = productService.createProductWithVariants(req, images);
log.info("success");
                    // Return a response entity with the created product
                    return ResponseEntity.ok(createdProduct);
                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
        
    }
}