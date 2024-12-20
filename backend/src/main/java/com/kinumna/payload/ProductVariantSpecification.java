package com.kinumna.payload;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.CollectionUtils;

import com.kinumna.model.ProductVariant;
import com.kinumna.payload.requests.ProductVariantFilter;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ProductVariantSpecification {

    public static Specification<ProductVariant> buildSpecification(ProductVariantFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filter by price range
            if (filter.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), filter.getMinPrice()));
            }
            if (filter.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), filter.getMaxPrice()));
            }

            // Filter by stock range
            if (filter.getMinStock() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("stock"), filter.getMinStock()));
            }
            if (filter.getMaxStock() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("stock"), filter.getMaxStock()));
            }

            // Filter by category ID (join with product and category)
            if (filter.getCategoryId() != null) {
                Join<?, ?> product = root.join("product");
                predicates.add(cb.equal(product.get("category").get("id"), filter.getCategoryId()));
            }

            // Filter by store ID
            if (filter.getStoreId() != null) {
                predicates.add(cb.equal(root.get("store").get("id"), filter.getStoreId()));
            }

            // Filter by product option IDs
            if (!CollectionUtils.isEmpty(filter.getProductOptionIds())) {
                Join<?, ?> options = root.join("productOptions");
                predicates.add(options.get("id").in(filter.getProductOptionIds()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
