package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Image;

public interface ImageRepo extends JpaRepository<Image,Integer> {
    
}
