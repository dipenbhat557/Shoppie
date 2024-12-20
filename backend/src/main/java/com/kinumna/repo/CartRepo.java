package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Cart;
import com.kinumna.model.User;

public interface CartRepo extends JpaRepository<Cart,Integer> {
    public Cart findByUser(User user);
}
