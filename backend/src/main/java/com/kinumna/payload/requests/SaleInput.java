package com.kinumna.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleInput {
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int discount;
    private boolean isPercentage;
    private List<Integer> productIds = new ArrayList<>(); 
}
