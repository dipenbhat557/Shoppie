package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Sale;

public interface SaleRepo extends JpaRepository<Sale,Integer>{
    
}
