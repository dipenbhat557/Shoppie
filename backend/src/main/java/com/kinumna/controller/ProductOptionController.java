package com.kinumna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kinumna.model.ProductOption;
import com.kinumna.payload.requests.ProductOptionInput;
import com.kinumna.service.ProductOptionService;


@RestController
@RequestMapping("/api/v1/product/option")
public class ProductOptionController {
    @Autowired
    private ProductOptionService productOptionService;

    @PostMapping
    public ResponseEntity<ProductOption> create(@RequestBody ProductOptionInput input){
        return ResponseEntity.ok(this.productOptionService.create(input));
    }

    @GetMapping
    public ResponseEntity<List<ProductOption>> getAll(){
        return ResponseEntity.ok(this.productOptionService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductOption> getById(@PathVariable int id){
        return ResponseEntity.ok(this.productOptionService.getById(id));
    }

    @GetMapping("/byGroup/{optionGroupId}")
    public ResponseEntity<List<ProductOption>> getByOptionGroup(@PathVariable int optionGroupId){
        return ResponseEntity.ok(this.productOptionService.getByOptionGroup(optionGroupId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductOption> update(@PathVariable int id, @RequestBody ProductOptionInput input){
        return ResponseEntity.ok(this.productOptionService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.productOptionService.deleteById(id);
        return ResponseEntity.ok("Product Option deleted");
    }
}
