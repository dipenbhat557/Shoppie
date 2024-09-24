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
import org.springframework.web.bind.annotation.RestController;

import com.kinumna.model.OrderItem;
import com.kinumna.service.OrderItemService;

@RestController
@RequestMapping("/api/v1/order-item")
public class OrderItemController {
    
    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public ResponseEntity<OrderItem> create(){
        return null;
    }

    @GetMapping
    public ResponseEntity<List<OrderItem>> getAll(){
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItem> getById(@PathVariable int id){
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> update(@PathVariable int id){
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable int id){
        return null;
    }
}
