package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Order;

public interface OrderRepo extends JpaRepository<Order,Integer>{

    
}
