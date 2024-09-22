package com.kinumna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kinumna.payload.requests.OrderInput;
import com.kinumna.payload.responses.OrderResponse;
import com.kinumna.service.OrderService;
import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

   @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderInput request) {
        return ResponseEntity.ok( orderService.createOrder(request));
    }
    
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAll(){
        return ResponseEntity.ok(this.orderService.getAll());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getById(@PathVariable int orderId){
        return ResponseEntity.ok(this.orderService.getById(orderId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getByUser(@PathVariable int userId){
        return ResponseEntity.ok(this.orderService.getByUser(userId));
    }
}
