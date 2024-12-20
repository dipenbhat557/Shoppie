package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem,Integer> {
    
}
