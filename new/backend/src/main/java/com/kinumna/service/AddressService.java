package com.kinumna.service;

import java.util.List;

import com.kinumna.payload.requests.AddressInput;
import com.kinumna.payload.responses.AddressResponse;

public interface AddressService {
    AddressResponse save(AddressInput input);
    AddressResponse findById(Integer id);
    List<AddressResponse> findAll();
    boolean deleteById(Integer id);
    AddressResponse updateAddress(Integer id, AddressInput input);
    String setPrimaryAddress(Integer id);
}