package com.shoppie.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoppie.model.Cart;
import com.shoppie.repo.CartRepo;
import com.shoppie.service.CartService;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepo cartRepo;

    @Override
    public Cart create(Cart cart) {
        return this.cartRepo.save(cart);
    }

    @Override
    public List<Cart> getAll() {
        return this.cartRepo.findAll();
    }

    @Override
    public Cart getById(int cartId) {
        try {
            return this.cartRepo.findById(cartId).orElseThrow(()->new Exception("Cart not found"));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Cart getByUserId(int userId) {
       return this.cartRepo.findByUserId(userId);
    }

    @Override
    public void clearByUserId(int userId) {
        Cart cart = this.cartRepo.findByUserId(userId);
        cart.setItems(null);
        this.cartRepo.save(cart);
    }

    @Override
    public void delete(int cartId) {
        this.cartRepo.delete(this.getById(cartId));
    }

    @Override
    public Cart update(int userId, Cart cart) {
        Cart newCart = this.getByUserId(userId);

        newCart.setItems(cart.getItems());

        return this.cartRepo.save(newCart);
    }
    
}
