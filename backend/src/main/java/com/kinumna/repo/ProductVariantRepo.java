package com.kinumna.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kinumna.model.Product;
import com.kinumna.model.ProductVariant;
import com.kinumna.model.Store;

public interface ProductVariantRepo extends JpaRepository<ProductVariant,Integer>,JpaSpecificationExecutor<ProductVariant> {
   
    @Query("SELECT pv FROM ProductVariant pv JOIN pv.productOptions po WHERE po.id IN :optionIds")
    List<ProductVariant> findByOptions(@Param("optionIds") List<Integer> optionIds);

    List<ProductVariant> findByProduct(Product product);

    List<ProductVariant> findByStore(Store store);

}
