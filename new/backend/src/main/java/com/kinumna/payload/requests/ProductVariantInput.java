package com.kinumna.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantInput {
    private String sku;
    private int price;
    private int stock;
    private int productId;
    private int productOptionGroupId;
    private int productOptionId;
    private int storeId; 
}
