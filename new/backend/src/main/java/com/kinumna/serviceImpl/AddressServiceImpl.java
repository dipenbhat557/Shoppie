package com.kinumna.serviceImpl;

import com.kinumna.model.Address;
import com.kinumna.model.User;
import com.kinumna.payload.requests.AddressInput;
import com.kinumna.repo.AddressRepo;
import com.kinumna.service.AddressService;
import com.kinumna.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepository;

    @Autowired
    private UserService userService;

    @Override
    public Address save(AddressInput input) {
        Address address = new Address();
        address.setHouseNo(input.getHouseNo());
        address.setStreet(input.getStreet());
        address.setCity(input.getCity());
        address.setDistrict(input.getDistrict());
        address.setState(input.getState());
        address.setPinCode(input.getPinCode());
        address.setLandmark(input.getLandmark());
        address.setPrimary(input.isPrimary());
        
        User user = userService.findById(input.getUserId());
        address.setUser(user);
        
        return addressRepository.save(address);
    }

    public Address updateAddress(Integer id, AddressInput input) {
        Optional<Address> existingAddress = addressRepository.findById(id);
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

            User user = userService.findById(input.getUserId());
            address.setUser(user);

            return addressRepository.save(address);
        }
        return null;
    }

    @Override
    public Address findById(Integer id) {
        return addressRepository.findById(id).orElse(null);
    }

    @Override
    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    @Override
    public boolean deleteById(Integer id) {
        try {
            addressRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
