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

import com.kinumna.model.Store;
import com.kinumna.payload.requests.StoreInput;
import com.kinumna.service.StoreService;

@RestController
@RequestMapping("/api/v1/store")
public class StoreController {
    
    @Autowired
    private StoreService storeService;

    @PostMapping
    public ResponseEntity<Store> create(@RequestBody StoreInput input){
        return ResponseEntity.ok(this.storeService.create(input));
    }

    @GetMapping
    public ResponseEntity<List<Store>> getAll(){
        return ResponseEntity.ok(this.storeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Store> getById(@PathVariable int id){
        return ResponseEntity.ok(this.storeService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Store> update(@PathVariable int id, @RequestBody StoreInput input){
        return ResponseEntity.ok(this.storeService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.storeService.deleteById(id);
        return ResponseEntity.ok("Store deleted successfully");
    }
}
