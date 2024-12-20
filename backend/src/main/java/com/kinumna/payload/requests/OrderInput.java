package com.kinumna.payload.requests;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderInput {
    private Integer userId;
    private String vendor;
    private List<OrderItemInput> items; 
}
