package com.kinumna.service;

import com.kinumna.payload.requests.OrderInput;
import com.kinumna.payload.responses.OrderResponse;

public interface OrderService {
   public OrderResponse createOrder(OrderInput request); 
}
