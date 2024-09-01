package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kinumna.model.ProductOption;

@Repository
public interface ProductOptionRepo extends JpaRepository<ProductOption, Integer> {
}