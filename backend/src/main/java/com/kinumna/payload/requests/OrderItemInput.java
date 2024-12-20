package com.kinumna.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemInput {
    private Integer productVariantId;
    private Integer quantity;
    private int orderId;
}
