package com.kinumna.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private int categoryId;
    private String categoryName;
    private int parentCategoryId;
    private byte[] image;
}
