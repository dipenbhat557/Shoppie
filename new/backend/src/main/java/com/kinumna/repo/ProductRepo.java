package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Product;

public interface ProductRepo  extends JpaRepository<Product,Integer>{
    
}
