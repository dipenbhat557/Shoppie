package com.kinumna.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Product;
import com.kinumna.model.Review;
import com.kinumna.model.User;

public interface ReviewRepo extends JpaRepository<Review,Integer>{
    List<Review> findByUser(User user);
    List<Review> findByProduct(Product product);
}
