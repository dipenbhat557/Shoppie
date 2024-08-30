package com.kinumna.payload;

import lombok.Data;

@Data
public class ProductInput {
    private String name;
    private Double price;
    private String description;
}