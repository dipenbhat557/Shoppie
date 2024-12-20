package com.kinumna.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleResponse {
    private int saleId;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int discount;
    private boolean isPercentage;
    private List<Integer> productIds = new ArrayList<>();
    private byte[] image;
}
