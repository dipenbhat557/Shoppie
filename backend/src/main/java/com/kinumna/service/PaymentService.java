package com.kinumna.service;

import java.util.List;

import com.kinumna.model.Payment;
import com.kinumna.payload.requests.PaymentInput;

public interface PaymentService {
   Payment create(PaymentInput input);
   Payment getById(int id);
   List<Payment> getAll();
   Payment update(int id, PaymentInput input);
   void deleteById(int id); 
}
