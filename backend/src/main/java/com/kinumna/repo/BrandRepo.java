package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kinumna.model.Brand;

@Repository
public interface BrandRepo extends JpaRepository<Brand, Integer> {
    
}