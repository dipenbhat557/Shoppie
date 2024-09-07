package com.kinumna.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductOptionDTO {
    private int id;
    private String name;
    private int productOptionGroupId;
    private String productOptionGroupName;
}