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

import com.kinumna.model.Payment;
import com.kinumna.payload.requests.PaymentInput;
import com.kinumna.service.PaymentService;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> create(@RequestBody PaymentInput input){
        return ResponseEntity.ok(this.paymentService.create(input));
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAll(){
        return ResponseEntity.ok(this.paymentService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getById(@PathVariable int id){
        return ResponseEntity.ok(this.paymentService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> update(@PathVariable int id, @RequestBody PaymentInput input){
        return ResponseEntity.ok(this.paymentService.update(id, input));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.paymentService.deleteById(id);
        return ResponseEntity.ok("payment deleted successfully");
    }
}
