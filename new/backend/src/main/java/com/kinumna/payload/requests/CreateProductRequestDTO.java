package com.kinumna.payload.requests;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequestDTO {
    private String name;
    private String description;
    private int categoryId;
    private int brandId;
    private List<OptionGroupDTO> optionGroups = new ArrayList<>();
    private int storeId;
    private int price;
    private int stock;
    private int productId;
}
