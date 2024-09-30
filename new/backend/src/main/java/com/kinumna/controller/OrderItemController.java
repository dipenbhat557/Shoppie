package com.kinumna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kinumna.model.OrderItem;
import com.kinumna.payload.requests.OrderItemInput;
import com.kinumna.payload.responses.OrderItemResponse;
import com.kinumna.service.OrderItemService;

@RestController
@RequestMapping("/api/v1/order-item")
public class OrderItemController {
    
    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public ResponseEntity<OrderItemResponse> create(@RequestBody OrderItemInput input){
        return new ResponseEntity<>(this.orderItemService.create(input),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<OrderItemResponse>> getAll(){
        return ResponseEntity.ok(this.orderItemService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemResponse> getById(@PathVariable int id){
        return ResponseEntity.ok(this.orderItemService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItemResponse> update(@PathVariable int id, @RequestBody OrderItemInput input){
        return ResponseEntity.ok(this.orderItemService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable int id){
        this.orderItemService.delete(id);
        return ResponseEntity.ok("Deleted Successfully!!");
    }
}
