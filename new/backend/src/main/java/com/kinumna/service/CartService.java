package com.kinumna.service;

import java.util.List;

import com.kinumna.payload.requests.CartItemRequestInput;
import com.kinumna.payload.responses.CartResponse;

public interface CartService {
   public CartResponse addCartItem(CartItemRequestInput request, Integer userId);
   public CartResponse getById(int id);
   public CartResponse getCartByUserId(Integer userId);
   public CartResponse update(int id, int userId);
   public List<CartResponse> getAll();
   public void delete(int id);
}
