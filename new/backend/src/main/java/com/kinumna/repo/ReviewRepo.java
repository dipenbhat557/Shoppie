package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Review;

public interface ReviewRepo extends JpaRepository<Review,Integer>{
    
}
