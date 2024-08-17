package com.shoppie.controller;

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

import com.shoppie.model.Cart;
import com.shoppie.service.CartService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;

   @PostMapping
   public ResponseEntity<Cart> create(@RequestBody Cart cart){
    return new ResponseEntity<>(this.cartService.create(cart),HttpStatus.OK);
   } 
   
   @GetMapping
   public ResponseEntity<List<Cart>> getAll(){
    return new ResponseEntity<>(this.cartService.getAll(),HttpStatus.OK);
   }

   @GetMapping("/{cartId}")
   public ResponseEntity<Cart> getByid(@PathVariable int cartId){
    return new ResponseEntity<>(this.cartService.getById(cartId),HttpStatus.OK);
   }

   @GetMapping("/user/{userId}")
   public ResponseEntity<Cart> getByUserId(@PathVariable int userId) {
       return new ResponseEntity<>(this.cartService.getByUserId(userId),HttpStatus.OK);
   }

   @DeleteMapping("/{cartId}")
   public ResponseEntity<String> delete(@PathVariable int cartId){
    this.cartService.delete(cartId);
    return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
   }

   @DeleteMapping("/user/{userId}")
   public ResponseEntity<String> deleteByUserId(@PathVariable int userId){
    this.cartService.clearByUserId(userId);
    return new ResponseEntity<>("Deleted successfully by user",HttpStatus.OK);
   }

   @PutMapping("/user/{userId}")
   public ResponseEntity<Cart> updateByUserId(@PathVariable int userId, @RequestBody Cart cart){
    return new ResponseEntity<>(this.cartService.update(userId, cart),HttpStatus.OK);
   }
   
}
