package com.kinumna.serviceImpl;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Address;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.ResponseFromObject;
import com.kinumna.payload.requests.AddressInput;
import com.kinumna.payload.responses.AddressResponse;
import com.kinumna.repo.AddressRepo;
import com.kinumna.service.AddressService;

import io.jsonwebtoken.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepository;

    @Autowired
    private ObjectFromInput objectFromInput;
    
    @Autowired
    private ResponseFromObject responseFromObject;

    @Override
    public AddressResponse save(AddressInput input) {
        Address address = new Address();

        address = this.objectFromInput.getAddress(address, input);
        
        address = addressRepository.save(address);

        return this.responseFromObject.getAddressResponse(address);
    }

    public AddressResponse updateAddress(Integer id, AddressInput input) {
        Address address = addressRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("expected address is not found"));
        if (address != null) {
            address = this.objectFromInput.getAddress(address, input);

            addressRepository.save(address);
            
            return this.responseFromObject.getAddressResponse(address);
        }
        return null;
    }

    @Override
    public AddressResponse findById(Integer id) {
        Address address = addressRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("expected address not found"));

        return this.responseFromObject.getAddressResponse(address);
    }

    @Override
    public List<AddressResponse> findAll() {
        List<Address> addresses = addressRepository.findAll();

        return addresses.stream()
                    .map(a -> this.responseFromObject.getAddressResponse(a))
                    .collect(Collectors.toList());
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

    @Override
    public String setPrimaryAddress(Integer id){
        Address address = this.addressRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("can't find address"));

        address.setPrimary(true);
        this.addressRepository.save(address);

        return "Primary address changes";
    }
}
