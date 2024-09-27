package com.kinumna.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public OrderItemResponse getById(int orderItemId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

    @Override
    public List<OrderItemResponse> getAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
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
