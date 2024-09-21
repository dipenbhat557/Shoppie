package com.kinumna.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {
    private Integer cartItemId;
    private Integer productVariantId;
    private Integer quantity;
    private Integer totalPrice; 
}
