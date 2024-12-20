package com.kinumna.service;

import java.util.List;

import com.kinumna.payload.requests.ReviewInput;
import com.kinumna.payload.responses.ReviewResponse;

public interface ReviewService {
    public ReviewResponse create(ReviewInput input);
    public List<ReviewResponse> getAll();
    public ReviewResponse getById(int id);
    public List<ReviewResponse> getByUser(int userId);
    public List<ReviewResponse> getByProduct(int productId);
    public ReviewResponse update(int id, ReviewInput input);
    public void delete(int id);    
}
