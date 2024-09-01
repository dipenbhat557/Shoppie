package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Payment;

public interface PaymentRepo extends JpaRepository<Payment,Integer> {
    
}
