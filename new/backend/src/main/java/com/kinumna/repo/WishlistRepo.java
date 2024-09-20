package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Wishlist;
import com.kinumna.model.User;


public interface WishlistRepo extends JpaRepository<Wishlist,Integer> {
   public Wishlist findByUser(User user); 
}
