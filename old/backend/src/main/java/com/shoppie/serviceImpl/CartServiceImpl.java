package com.shoppie.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoppie.model.Cart;
import com.shoppie.model.CartItem;
import com.shoppie.payload.CartReq;
import com.shoppie.repo.CartItemRepo;
import com.shoppie.repo.CartRepo;
import com.shoppie.service.CartService;

import jakarta.transaction.Transactional;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartItemRepo cartItemRepo;

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
    public void clearProductOfUser(int userId,int productId) {
        Cart cart = this.cartRepo.findByUserId(userId);
        if (cart != null) {
            // Filter out the product with the specified productId
            List<CartItem> updatedItems = cart.getItems().stream()
                .filter(item -> item.getProductId() != productId)
                .collect(Collectors.toList());
            
            // Update the cart with the filtered list
            cart.setItems(updatedItems);

            
            // Save the updated cart
            this.cartRepo.save(cart);
        }
    }


    @Override
    public void delete(int cartId) {
        this.cartRepo.delete(this.getById(cartId));
    }

    @Transactional
    @Override
    public Cart update(int userId, CartReq cartReq) {
        System.out.println("Service reached");
    
        Cart existingCart = this.getByUserId(userId);
        
        if (existingCart == null) {
            existingCart = new Cart();
            existingCart.setUserId(userId);
        }
    
        // Check if the item already exists in the cart
        CartItem existingItem = existingCart.getItems().stream()
            .filter(i -> i.getProductId() == cartReq.getProductId())
            .findFirst().orElse(null);
    
        if (existingItem == null) {
            // Create a new CartItem if it doesn't exist
            CartItem newItem = new CartItem();
            newItem.setProductId(cartReq.getProductId());
            newItem.setQuantity(cartReq.getQuantity());
    
            // Add the new item to the cart and save
            existingCart.getItems().add(newItem);
            this.cartItemRepo.save(newItem);
        } else {
            // Update the quantity of the existing item
            existingItem.setQuantity(existingItem.getQuantity() + cartReq.getQuantity());
            this.cartItemRepo.save(existingItem);
        }
    
        return this.cartRepo.save(existingCart);
    }
    
}
    