package com.kinumna.payload.requests;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantFilter {
    private Integer minPrice;
    private Integer maxPrice;
    private Integer minStock;
    private Integer maxStock;
    private Integer categoryId;
    private Integer storeId;
    private List<Integer> productOptionIds; 
}
