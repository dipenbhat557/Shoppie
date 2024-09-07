package com.kinumna.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Payment;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.requests.PaymentInput;
import com.kinumna.repo.PaymentRepo;
import com.kinumna.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Override
    public Payment create(PaymentInput input) {
        Payment payment = new Payment();

        payment = this.objectFromInput.getPayment(payment, input);

        payment = this.paymentRepo.save(payment);

        return payment;
    }

    @Override
    public Payment getById(int id) {
        return this.paymentRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Payment not found"));
    }

    @Override
    public List<Payment> getAll() {
        return this.paymentRepo.findAll();
    }

    @Override
    public Payment update(int id, PaymentInput input) {
        Payment payment = this.getById(id);

        payment = this.objectFromInput.getPayment(payment, input);

        payment = this.paymentRepo.save(payment);

        return payment;
    }

    @Override
    public void deleteById(int id) {
        this.paymentRepo.findById(id);
    }
    
}
