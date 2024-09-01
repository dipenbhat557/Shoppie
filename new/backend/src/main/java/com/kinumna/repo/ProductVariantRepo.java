package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.ProductVariant;

public interface ProductVariantRepo extends JpaRepository<ProductVariant,Integer> {
    
}
