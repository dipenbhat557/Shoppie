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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kinumna.payload.requests.ProductVariantFilter;
import com.kinumna.payload.requests.ProductVariantInput;
import com.kinumna.payload.responses.ProductVariantDTO;
import com.kinumna.service.ProductVariantService;

@RestController
@RequestMapping("/api/v1/product/variant")
public class ProductVariantController {

    @Autowired
    private ProductVariantService productVariantService;

    @PostMapping(value = "",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductVariantDTO> create(@RequestParam("input") String inputJson, @RequestParam("images") List<MultipartFile> images){
        ObjectMapper mapper = new ObjectMapper();

        try {
            ProductVariantInput input = mapper.readValue(inputJson, ProductVariantInput.class);
            return ResponseEntity.ok(this.productVariantService.create(input, images));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductVariantDTO> getById(@PathVariable int id){
        return ResponseEntity.ok(this.productVariantService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductVariantDTO>> getAll(){
        return ResponseEntity.ok(this.productVariantService.getAll());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductVariantDTO>> getByCategory(@PathVariable("categoryId") int categoryId){
        return ResponseEntity.ok(this.productVariantService.getByCategory(categoryId));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductVariantDTO>> getByStore(@PathVariable("storeId") int storeId){
        return ResponseEntity.ok(this.productVariantService.getByStore(storeId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductVariantDTO>> getByProduct(@PathVariable int productId){
        return ResponseEntity.ok(this.productVariantService.getByProduct(productId));
    }

    @GetMapping("/sale/{saleId}")
    public ResponseEntity<List<ProductVariantDTO>> getBySale(@PathVariable int saleId){
        return ResponseEntity.ok(this.productVariantService.getBySale(saleId));
    }

    @PutMapping(value = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductVariantDTO> update(@PathVariable int id, @RequestParam("input") String inputJson, List<MultipartFile> images){
       ObjectMapper mapper = new ObjectMapper();
       try {
        ProductVariantInput input = mapper.readValue(inputJson, ProductVariantInput.class);
        return ResponseEntity.ok(this.productVariantService.update(id, input, images));
       } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       }
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.productVariantService.delete(id);
        return ResponseEntity.ok("Product Variant deleted");
    }

    @PostMapping("/fiter")
    public ResponseEntity<List<ProductVariantDTO>> filter(@RequestBody ProductVariantFilter filter){
        return ResponseEntity.ok(this.productVariantService.filter(filter));
    }

}
