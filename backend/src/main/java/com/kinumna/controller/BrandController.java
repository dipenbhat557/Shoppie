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

import com.kinumna.model.Brand;
import com.kinumna.service.BrandService;

@RestController
@RequestMapping("/api/v1/brand")
public class BrandController {
    
    @Autowired
    private BrandService brandService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Brand> create(@RequestParam("file") MultipartFile file, @RequestParam("name") String name){
        return new ResponseEntity<>(this.brandService.create(name, file), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Brand>> getAll(){
        return new ResponseEntity<>(this.brandService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getById(@PathVariable int id){
        return new ResponseEntity<>(this.brandService.getById(id),HttpStatus.OK);
    }
    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Brand> updateById(@PathVariable int id, @RequestParam("name") String name, @RequestParam("file") MultipartFile file){
        return new ResponseEntity<>(this.brandService.update(id, name, file), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.brandService.delete(id);
        return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
    }
}
