package com.shoppie.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shoppie.model.CartItem;


public interface CartItemRepo extends JpaRepository<CartItem,Integer>{
}
