package com.kinumna.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Category;
import com.kinumna.model.Product;

public interface ProductRepo  extends JpaRepository<Product,Integer>{
   List<Product> findByCategory(Category category); 
}
