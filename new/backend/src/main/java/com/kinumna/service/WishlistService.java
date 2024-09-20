package com.kinumna.service;

import com.kinumna.payload.requests.WishlistInput;
import com.kinumna.payload.responses.WishlistResponse;

import java.util.List;

public interface WishlistService {
   public WishlistResponse create(WishlistInput input);
   public WishlistResponse getById(int id);
   public List<WishlistResponse> getAll(); 
   public WishlistResponse getByUser(int userId);
   public WishlistResponse update(int id, WishlistInput input);
   public void delete(int id);
}
