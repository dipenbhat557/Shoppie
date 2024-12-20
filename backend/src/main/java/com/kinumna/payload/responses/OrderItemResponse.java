package com.kinumna.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {
    private Integer orderItemId;
    private Integer productVariantId;
    private Integer quantity;
    private Integer totalPrice;
    private Integer orderId; 
}
