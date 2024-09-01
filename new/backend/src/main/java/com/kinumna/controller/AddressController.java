package com.kinumna.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.kinumna.model.Address;
import com.kinumna.model.User;
import com.kinumna.payload.requests.AddressInput;
import com.kinumna.service.AddressService;
import com.kinumna.service.UserService;

@Controller
public class AddressController {
    
    @Autowired
    private AddressService addressService;

    @Autowired
    private UserService userService;

    @QueryMapping
    public Address getAddress(Integer id) {
        return addressService.findById(id).orElse(null);
    }

    @QueryMapping
    public List<Address> listAddresses() {
        return addressService.findAll();
    }

    @MutationMapping
    public Address createAddress(AddressInput input) {
        Address address = new Address();
        address.setHouseNo(input.getHouseNo());
        address.setStreet(input.getStreet());
        address.setCity(input.getCity());
        address.setDistrict(input.getDistrict());
        address.setState(input.getState());
        address.setPinCode(input.getPinCode());
        address.setLandmark(input.getLandmark());
        address.setPrimary(input.isPrimary());
        
        User user = userService.findById(input.getUserId()).orElse(null);
        address.setUser(user);
        
        return addressService.save(address);
    }

    @MutationMapping
    public Address updateAddress(Integer id, AddressInput input) {
        Optional<Address> existingAddress = addressService.findById(id);
        if (existingAddress.isPresent()) {
            Address address = existingAddress.get();
            address.setHouseNo(input.getHouseNo());
            address.setStreet(input.getStreet());
            address.setCity(input.getCity());
            address.setDistrict(input.getDistrict());
            address.setState(input.getState());
            address.setPinCode(input.getPinCode());
            address.setLandmark(input.getLandmark());
            address.setPrimary(input.isPrimary());

            User user = userService.findById(input.getUserId()).orElse(null);
            address.setUser(user);

            return addressService.save(address);
        }
        return null;
    }

    @MutationMapping
    public Boolean deleteAddress(Integer id) {
        try {
            addressService.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
