package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem,Integer> {
    
}
