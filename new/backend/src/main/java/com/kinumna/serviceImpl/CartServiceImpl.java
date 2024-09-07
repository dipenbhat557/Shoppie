package com.kinumna.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Cart;
import com.kinumna.model.User;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.responses.CartResponse;
import com.kinumna.repo.CartRepo;
import com.kinumna.service.CartService;
import com.kinumna.service.UserService;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ResponseFromObject responseFromObject;

    @Override
    public CartResponse create(int userId) {

        Cart cart = new Cart();

        User user = this.userService.findById(userId);
        cart.setUser(user);

        cart = this.cartRepo.save(cart);

        return responseFromObject.getCartResponse(cart);

    }

    @Override
    public CartResponse getById(int id) {
        return this.responseFromObject.getCartResponse(this.cartRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("cart not found")));
    }

    @Override
    public CartResponse update(int id, int userId) {
        Cart cart = this.cartRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("cart not found"));

        cart.setUser(this.userService.findById(userId));

        return this.responseFromObject.getCartResponse(cart);
    }

    @Override
    public List<CartResponse> getAll() {
        return this.cartRepo.findAll()
            .stream().map(c -> 
                this.responseFromObject.getCartResponse(c))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(int id) {
        this.cartRepo.deleteById(id);
    }
    
}
