package com.kinumna.service;

import java.util.List;

import com.kinumna.payload.responses.CartResponse;

public interface CartService {
   CartResponse create(int userId);
   CartResponse getById(int id);
   CartResponse update(int id, int userId);
   List<CartResponse> getAll();
   void delete(int id);
}
