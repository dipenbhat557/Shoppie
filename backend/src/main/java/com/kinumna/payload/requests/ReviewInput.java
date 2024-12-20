package com.kinumna.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewInput {
    private int rating;
    private String comment;
    private int userId;
    private int productId; 
}
