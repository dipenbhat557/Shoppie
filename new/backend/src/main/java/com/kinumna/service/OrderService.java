package com.kinumna.service;

import java.util.List;

import com.kinumna.payload.requests.OrderInput;
import com.kinumna.payload.responses.OrderResponse;

public interface OrderService {
   public OrderResponse createOrder(OrderInput request);
   public List<OrderResponse> getByUser(int userId);
   public List<OrderResponse> getAll();
   public OrderResponse getById(int orderId); 
}
