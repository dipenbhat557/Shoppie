package com.kinumna.payload.responses;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
   private Integer orderId;
    private String status;
    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;
    private List<OrderItemResponse> items; 
}
