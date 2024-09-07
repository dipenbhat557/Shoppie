package com.kinumna.payload.responses;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDTO {
    private int variantId;
    private String sku;
    private int price;
    private int stock;
    private int productId;
    private String productName;
    private Integer storeId;
    private String storeName;
    private List<ProductOptionDTO> productOptions;
    private List<ImageResponse> images;
}
