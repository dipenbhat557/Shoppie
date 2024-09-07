package com.kinumna.service;

import java.util.List;

import com.kinumna.model.Store;
import com.kinumna.payload.requests.StoreInput;

public interface StoreService {
    Store create(StoreInput input);
    Store getById(int id);
    List<Store> getAll();
    Store update(int id, StoreInput input);
    void deleteById(int id);
    
}
