package com.kinumna.payload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.Address;
import com.kinumna.model.Category;
import com.kinumna.model.User;
import com.kinumna.payload.requests.AddressInput;
import com.kinumna.payload.requests.CategoryInput;
import com.kinumna.payload.requests.UserInput;
import com.kinumna.repo.CategoryRepo;
import com.kinumna.service.CategoryService;
import com.kinumna.service.UserService;
import java.io.IOException;


@Component
public class ObjectFromInput {

    @Autowired
    @Lazy
    private UserService userService;

    @Autowired
    private CategoryRepo categoryRepo;
   
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

    public Category getCategory(Category category, CategoryInput input, MultipartFile image){
        category.setCategoryName(input.getName());
        category.setParentCategory(this.categoryRepo.findById(input.getParentCategoryId()).orElseThrow(()->new ResourceNotFoundException("category can't be found")));
        
        if(image != null){
            try {
                category.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return category;
    }
}
