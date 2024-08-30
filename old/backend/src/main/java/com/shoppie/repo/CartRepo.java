package com.shoppie.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shoppie.model.Cart;


public interface CartRepo extends JpaRepository<Cart,Integer> {
    public Cart findByUserId(int userId); 
}
