package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Category;

public interface CategoryRepo extends JpaRepository<Category,Integer> {
    
}
