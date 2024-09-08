package com.kinumna.payload.responses;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private int id;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
    private int userId;
    private int productId;
}
