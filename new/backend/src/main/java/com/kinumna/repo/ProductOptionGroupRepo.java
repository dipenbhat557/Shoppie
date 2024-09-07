package com.kinumna.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kinumna.model.ProductOptionGroup;


@Repository
public interface ProductOptionGroupRepo extends JpaRepository<ProductOptionGroup, Integer> {
    Optional<ProductOptionGroup> findByName(String name);
}