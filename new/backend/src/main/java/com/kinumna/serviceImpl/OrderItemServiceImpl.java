package com.kinumna.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.kinumna.model.OrderItem;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.OrderItemInput;
import com.kinumna.payload.responses.OrderItemResponse;
import com.kinumna.repo.OrderItemRepo;
import com.kinumna.service.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService{

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Override
    public OrderItemResponse create(OrderItemInput input) {
        OrderItem orderItem = new OrderItem();

        orderItem = this.objectFromInput.getOrderItem(orderItem, input);
        orderItem = this.orderItemRepo.save(orderItem);

        return this.responseFromObject.getOrderItemResponse(orderItem);
    }

    @Override
    public OrderItemResponse getById(int orderItemId) {
        return this.responseFromObject.getOrderItemResponse(this.orderItemRepo.findById(orderItemId).orElseThrow(()->new ResourceAccessException("order item not found")));
    }

    @Override
    public List<OrderItemResponse> getAll() {
        return this.orderItemRepo.findAll().stream().map(item -> this.responseFromObject.getOrderItemResponse(item)).collect(Collectors.toList());
    }

    @Override
    public OrderItemResponse update(int id, OrderItemInput input) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
    
}
