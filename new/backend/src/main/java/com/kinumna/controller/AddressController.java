package com.kinumna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.kinumna.model.Address;
import com.kinumna.payload.requests.AddressInput;
import com.kinumna.service.AddressService;

@Controller
public class AddressController {
    
    @Autowired
    private AddressService addressService;

    @QueryMapping
    public Address getAddress(Integer id) {
        return this.addressService.findById(id);
    }

    @QueryMapping
    public List<Address> listAddresses() {
        return addressService.findAll();
    }

    @MutationMapping
    public Address createAddress(AddressInput input) {
        return addressService.save(input);
    }

    @MutationMapping
    public Address updateAddress(Integer id, AddressInput input) {
        return this.addressService.updateAddress(id, input);
    }

    @MutationMapping
    public Boolean deleteAddress(Integer id) {
        return this.addressService.deleteById(id);
    }
}
