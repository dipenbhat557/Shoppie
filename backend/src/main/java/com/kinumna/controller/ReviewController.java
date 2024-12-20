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

import com.kinumna.payload.requests.ReviewInput;
import com.kinumna.payload.responses.ReviewResponse;
import com.kinumna.service.ReviewService;

@RestController
@RequestMapping("/api/v1/review")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> create(@RequestBody ReviewInput input){
        return ResponseEntity.ok(this.reviewService.create(input));
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getAll(){
        return ResponseEntity.ok(this.reviewService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponse> getById(@PathVariable int id){
        return ResponseEntity.ok(this.reviewService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponse>> getByUser(@PathVariable int userId){
        return ResponseEntity.ok(this.reviewService.getByUser(userId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getByProduct(@PathVariable int productId){
        return ResponseEntity.ok(this.reviewService.getByProduct(productId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponse> update(@PathVariable int id, @RequestBody ReviewInput input){
        return ResponseEntity.ok(this.reviewService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.reviewService.delete(id);
        return ResponseEntity.ok("Review deleted successfully");
    }
}
