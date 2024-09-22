package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Order;
import com.kinumna.model.User;

import java.util.List;
public interface OrderRepo extends JpaRepository<Order,Integer>{
    public List<Order> findByUser(User user);
}
