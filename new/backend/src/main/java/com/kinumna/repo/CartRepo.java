package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Cart;

public interface CartRepo extends JpaRepository<Cart,Integer> {
    
}
