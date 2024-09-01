package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Wishlist;

public interface WishlistRepo extends JpaRepository<Wishlist,Integer> {
    
}
