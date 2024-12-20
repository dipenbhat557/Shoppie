package com.kinumna.service;

import java.util.List;

import com.kinumna.payload.requests.OrderItemInput;
import com.kinumna.payload.responses.OrderItemResponse;

public interface OrderItemService {
    public OrderItemResponse create(OrderItemInput input);
    public OrderItemResponse getById(int orderItemId);
    public List<OrderItemResponse> getAll();
    public OrderItemResponse update(int id, OrderItemInput input);
    public void delete(int id);
}
