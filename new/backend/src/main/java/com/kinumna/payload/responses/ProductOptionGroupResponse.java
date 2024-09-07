package com.kinumna.payload.responses;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductOptionGroupResponse {
    private int id;
    private String name;
    private List<Integer> productOptionIds = new ArrayList<>();
}
