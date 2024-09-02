package com.kinumna.service;

import java.util.List;

import com.kinumna.model.Address;
import com.kinumna.payload.requests.AddressInput;

public interface AddressService {
    Address save(AddressInput input);
    Address findById(Integer id);
    List<Address> findAll();
    boolean deleteById(Integer id);
    public Address updateAddress(Integer id, AddressInput input);
}