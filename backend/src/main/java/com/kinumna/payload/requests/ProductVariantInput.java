package com.kinumna.payload.requests;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantInput {
    private int price;
    private int stock;
    private int productId;
    private List<Integer> productOptionId = new ArrayList<>();
    private int storeId; 
}
