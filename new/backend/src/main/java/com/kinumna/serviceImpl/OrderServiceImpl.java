package com.kinumna.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Order;
import com.kinumna.model.OrderItem;
import com.kinumna.model.ProductVariant;
import com.kinumna.model.User;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.OrderInput;
import com.kinumna.payload.responses.OrderResponse;
import com.kinumna.repo.OrderRepo;
import com.kinumna.repo.ProductVariantRepo;
import com.kinumna.repo.UserRepo;
import com.kinumna.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProductVariantRepo productVariantRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Override
    public OrderResponse createOrder(OrderInput request) {
            // Fetch user
            User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
            // Create new order
            Order order = new Order();
            order.setUser(user);
            order.setVendor(request.getVendor());
            order.setOrderDate(LocalDateTime.now());
    
            // Add order items
            List<OrderItem> orderItems = request.getItems().stream()
                .map(item -> {
                    ProductVariant productVariant = productVariantRepo.findById(item.getProductVariantId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product variant not found"));
    
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setProductVariant(productVariant);
                    orderItem.setQuantity(item.getQuantity());
                    orderItem.setPrice(productVariant.getPrice() * item.getQuantity());
    
                    return orderItem;
                }).collect(Collectors.toList());
    
            order.setItems(orderItems);
            orderRepo.save(order);
    
            return this.responseFromObject.getOrderResponse(order);
    }

    @Override
    public List<OrderResponse> getByUser(int userId) {

        User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("user not found"));

        List<Order> orders = this.orderRepo.findByUser(user);

        return orders.stream().map(order->this.responseFromObject.getOrderResponse(order)).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getAll() {
        return this.orderRepo.findAll().stream().map(order -> this.responseFromObject.getOrderResponse(order)).collect(Collectors.toList());
    }

    @Override
    public OrderResponse getById(int orderId) {
        return this.responseFromObject.getOrderResponse(this.orderRepo.findById(orderId).orElseThrow(()->new ResourceNotFoundException("order not found")));
    }
    
}
