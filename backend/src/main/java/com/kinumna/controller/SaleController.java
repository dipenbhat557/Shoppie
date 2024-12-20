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
import com.kinumna.payload.requests.SaleInput;
import com.kinumna.payload.responses.SaleResponse;
import com.kinumna.service.SaleService;

@RestController
@RequestMapping("/api/v1/sale")
public class SaleController {
    
    @Autowired
    private SaleService saleService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SaleResponse> create(@RequestParam("input") String input, @RequestParam("file") MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();

        try {
            SaleInput saleInput = mapper.readValue(input, SaleInput.class);
            return ResponseEntity.ok(this.saleService.create(saleInput, file));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleResponse> getById(@PathVariable int id){
        return ResponseEntity.ok(this.saleService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SaleResponse>> getAll(){
        return ResponseEntity.ok(this.saleService.getAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<SaleResponse>> getActiveSales(){
        return ResponseEntity.ok(this.saleService.getActiveSales());
    }

    @PutMapping(value = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SaleResponse> update(@PathVariable int id, @RequestParam("input") String input, @RequestParam("file") MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();

        try {
            SaleInput saleInput = mapper.readValue(input, SaleInput.class);
            return ResponseEntity.ok(this.saleService.update(id, saleInput, file));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.saleService.delete(id);
        return ResponseEntity.ok("Sale deleted successfully");
    }
}
