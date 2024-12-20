package com.kinumna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kinumna.payload.responses.ProductOptionGroupResponse;
import com.kinumna.service.ProductOptionGroupService;

@RestController
@RequestMapping("/api/v1/product/option/group")
public class ProductOptionGroupController {

    @Autowired
    private ProductOptionGroupService optionGroupService;

    @PostMapping
    public ResponseEntity<ProductOptionGroupResponse> create(@RequestParam("optionGroupName") String optionGroupName){
        return ResponseEntity.ok(this.optionGroupService.createOptionGroup(optionGroupName));
    }

    @GetMapping
    public ResponseEntity<List<ProductOptionGroupResponse>> getAll(){
        return ResponseEntity.ok(this.optionGroupService.getAllOptionGroups());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductOptionGroupResponse> getById(@PathVariable int id){
        return ResponseEntity.ok(this.optionGroupService.getOptionGroupById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductOptionGroupResponse>> getByCategory(@PathVariable int categoryId){
        return ResponseEntity.ok(this.optionGroupService.getByCategory(categoryId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductOptionGroupResponse> update(@PathVariable int id, @RequestParam("optionGroupName") String optionGroupName){
        return ResponseEntity.ok(this.optionGroupService.updateOptionGroup(id, optionGroupName));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.optionGroupService.deleteOptionGroup(id);
        return ResponseEntity.ok("Option Group deleted Successfully");
    }
}
