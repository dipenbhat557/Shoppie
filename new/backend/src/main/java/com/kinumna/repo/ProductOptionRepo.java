package com.kinumna.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kinumna.model.ProductOption;
import com.kinumna.model.ProductOptionGroup;

@Repository
public interface ProductOptionRepo extends JpaRepository<ProductOption, Integer> {
    Optional<ProductOption> findByNameAndProductOptionGroup(String name, ProductOptionGroup productOptionGroup);
    List<ProductOption> findByProductOptionGroup(ProductOptionGroup productOptionGroup);
}