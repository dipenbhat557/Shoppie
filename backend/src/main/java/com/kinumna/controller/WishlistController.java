package com.kinumna.controller;

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

import com.kinumna.payload.requests.WishlistInput;
import com.kinumna.payload.responses.WishlistResponse;
import com.kinumna.service.WishlistService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlist")
public class WishlistController {
    
    @Autowired
    private WishlistService wishlistService;

    @PostMapping
    public ResponseEntity<WishlistResponse> create(@RequestBody WishlistInput input){
        return ResponseEntity.ok(this.wishlistService.create(input));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WishlistResponse> getById(@PathVariable int id){
        return ResponseEntity.ok(this.wishlistService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<WishlistResponse>> getAll(){
        return ResponseEntity.ok(this.wishlistService.getAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<WishlistResponse> getByUser(@PathVariable int userId){
        return ResponseEntity.ok(this.wishlistService.getByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WishlistResponse> update(@PathVariable int id, @RequestBody WishlistInput input){
        return ResponseEntity.ok(this.wishlistService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.wishlistService.delete(id);
        return ResponseEntity.ok("wishlist deleted successfully");
    }

}
