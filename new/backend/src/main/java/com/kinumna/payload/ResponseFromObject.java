package com.kinumna.payload;

import org.springframework.stereotype.Component;

import com.kinumna.model.Address;
import com.kinumna.payload.responses.AddressResponse;

@Component
public class ResponseFromObject {

    public AddressResponse getAddressResponse(Address address){
        AddressResponse response = new AddressResponse();
        response.setId(address.getId());
        response.setHouseNo(address.getHouseNo());
        response.setStreet(address.getStreet());
        response.setCity(address.getCity());
        response.setDistrict(address.getDistrict());
        response.setState(address.getState());
        response.setPinCode(address.getPinCode());
        response.setLandmark(address.getLandmark());
        response.setPrimary(address.isPrimary());
        response.setUserId(address.getUser().getUserId());

        return response;
    }
}
