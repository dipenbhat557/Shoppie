package com.kinumna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
}
