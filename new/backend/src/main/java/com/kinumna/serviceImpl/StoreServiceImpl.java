package com.kinumna.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Store;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.requests.StoreInput;
import com.kinumna.repo.StoreRepo;
import com.kinumna.service.StoreService;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepo storeRepo;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Override
    public Store create(StoreInput input) {
        Store store = new Store();

        store = this.objectFromInput.getStore(store, input);

        store = this.storeRepo.save(store);

        return store;
    }

    @Override
    public Store getById(int id) {
        return this.storeRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Store not found"));
    }

    @Override
    public List<Store> getAll() {
        return this.storeRepo.findAll();
    }

    @Override
    public Store update(int id, StoreInput input) {
        Store store = this.getById(id);

        if(store != null){
            store = this.objectFromInput.getStore(store, input);

            store = this.storeRepo.save(store);
            return store;
        }

        return null;
    }

    @Override
    public void deleteById(int id) {
        this.storeRepo.deleteById(id);
    }
    
}
