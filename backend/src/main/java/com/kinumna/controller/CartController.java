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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kinumna.payload.requests.CartItemRequestInput;
import com.kinumna.payload.responses.CartResponse;
import com.kinumna.service.CartService;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartResponse> addCartItem(@RequestBody CartItemRequestInput request, @PathVariable Integer userId) {
        return ResponseEntity.ok(cartService.addCartItem(request, userId));
    }


   @GetMapping("/{id}")
   public ResponseEntity<CartResponse> getById(@PathVariable int id){
    return ResponseEntity.ok(this.cartService.getById(id));
   }

   @GetMapping
   public ResponseEntity<List<CartResponse>> getAll(){
    return ResponseEntity.ok(this.cartService.getAll());
   }

   @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable Integer userId) {
        return ResponseEntity.ok( cartService.getCartByUserId(userId));
    }

   @PutMapping("/{id}")
   public ResponseEntity<CartResponse> update(@PathVariable int id, @RequestParam("userId") int userId ){
    return ResponseEntity.ok(this.cartService.update(id, userId));
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<String> delete(@PathVariable int id){
    this.cartService.delete(id);
    return ResponseEntity.ok("Cart Deleted Succesfully");
   }
}
