package com.kinumna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kinumna.payload.requests.OrderInput;
import com.kinumna.payload.responses.OrderResponse;
import com.kinumna.service.OrderService;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

   @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderInput request) {
        return ResponseEntity.ok( orderService.createOrder(request));
    } 
}
