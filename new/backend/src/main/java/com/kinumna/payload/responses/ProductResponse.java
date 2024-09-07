package com.kinumna.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private int productId;
    private String name;
    private String description;
    private int stock;
    private int price;
    private int saleId;
    private int brandId;
    private int categoryId;
}
