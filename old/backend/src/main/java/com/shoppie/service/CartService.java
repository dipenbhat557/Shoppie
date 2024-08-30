package com.shoppie.service;

import java.util.List;

import com.shoppie.model.Cart;
import com.shoppie.payload.CartReq;

public interface CartService {

    public Cart create(Cart cart);

    public List<Cart> getAll();

    public Cart getById(int cartId);

    public Cart getByUserId(int userId);

    public void clearProductOfUser(int userId,int productId);

    public void delete(int cartId);

    public Cart update(int userId, CartReq cartReq);
    
}
