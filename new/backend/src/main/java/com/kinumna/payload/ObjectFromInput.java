package com.kinumna.payload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.model.Address;
import com.kinumna.model.User;
import com.kinumna.payload.requests.AddressInput;
import com.kinumna.payload.requests.UserInput;
import com.kinumna.service.UserService;
import java.io.IOException;


@Component
public class ObjectFromInput {

    @Autowired
    @Lazy
    private UserService userService;
   
    public Address getAddress(Address address, AddressInput input){
        
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

        return address;
    }

    public User getUser(User user, UserInput input, MultipartFile profilePicture){
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPhoneNo(input.getPhoneNumber());
        user.setPassword(input.getPassword());
        user.setDob(input.getDob());
        user.setGender(input.getGender());

        if(profilePicture != null){
            try {
                user.setProfile(profilePicture.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return user;
    }
}
