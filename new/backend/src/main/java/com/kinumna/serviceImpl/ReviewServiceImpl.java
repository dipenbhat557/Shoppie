package com.kinumna.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Product;
import com.kinumna.model.Review;
import com.kinumna.model.User;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.ReviewInput;
import com.kinumna.payload.responses.ReviewResponse;
import com.kinumna.repo.ProductRepo;
import com.kinumna.repo.ReviewRepo;
import com.kinumna.repo.UserRepo;
import com.kinumna.service.ReviewService;

import java.time.LocalDateTime;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Override
    public ReviewResponse create(ReviewInput input) {
        Review review = new Review();

        review.setComment(input.getComment());
        review.setRating(input.getRating());
        review.setCreatedAt(LocalDateTime.now());
        
        Product product = this.productRepo.findById(input.getProductId()).orElseThrow(()->new ResourceNotFoundException("product not found"));
        User user = this.userRepo.findById(input.getUserId()).orElseThrow(()->new ResourceNotFoundException("user not found"));

        review.setUser(user);
        review.setProduct(product);

        review = this.reviewRepo.save(review);

        return this.responseFromObject.getReviewResponse(review);

    }

    @Override
    public List<ReviewResponse> getAll() {
        return this.reviewRepo.findAll().stream().map(review->this.responseFromObject.getReviewResponse(review)).collect(Collectors.toList());
    }

    @Override
    public ReviewResponse getById(int id) {
        return this.responseFromObject.getReviewResponse(this.reviewRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("review not found")));
    }

    @Override
    public List<ReviewResponse> getByUser(int userId) {
        User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("user not found"));
        return this.reviewRepo.findByUser(user).stream().map(review->this.responseFromObject.getReviewResponse(review)).collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponse> getByProduct(int productId) {
        Product product = this.productRepo.findById(productId).orElseThrow(()->new ResourceNotFoundException("product not found"));
        return this.reviewRepo.findByProduct(product).stream().map(review->this.responseFromObject.getReviewResponse(review)).collect(Collectors.toList());
    }

    @Override
    public ReviewResponse update(int id, ReviewInput input) {
        Review review = this.reviewRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Review not found"));

        review.setComment(input.getComment());
        review.setRating(input.getRating());
        review.setCreatedAt(LocalDateTime.now());
        
        Product product = this.productRepo.findById(input.getProductId()).orElseThrow(()->new ResourceNotFoundException("product not found"));
        User user = this.userRepo.findById(input.getUserId()).orElseThrow(()->new ResourceNotFoundException("user not found"));

        review.setUser(user);
        review.setProduct(product);

        review = this.reviewRepo.save(review);

        return this.responseFromObject.getReviewResponse(review);
    }

    @Override
    public void delete(int id) {
        this.reviewRepo.deleteById(id);
    }
    
}
