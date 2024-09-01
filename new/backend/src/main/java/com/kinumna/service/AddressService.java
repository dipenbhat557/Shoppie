package com.kinumna.service;

import java.util.List;
import java.util.Optional;

import com.kinumna.model.Address;

public interface AddressService {
    Address save(Address address);
    Optional<Address> findById(Integer id);
    List<Address> findAll();
    void deleteById(Integer id);
}