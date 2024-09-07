package com.kinumna.payload;

import org.springframework.stereotype.Component;

import com.kinumna.model.Address;
import com.kinumna.model.Cart;
import com.kinumna.model.Category;
import com.kinumna.payload.responses.AddressResponse;
import com.kinumna.payload.responses.CartResponse;
import com.kinumna.payload.responses.CategoryResponse;

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

    public CartResponse getCartResponse(Cart cart){
        CartResponse response = new CartResponse();

        response.setId(cart.getCartId());
        response.setUserId(cart.getUser().getUserId());

        return response;
    }

    public CategoryResponse getCategoryResponse(Category category){
        CategoryResponse response = new CategoryResponse();

        response.setCategoryId(category.getCategoryId());
        response.setCategoryName(category.getCategoryName());
        response.setParentCategoryId(category.getParentCategory().getCategoryId());
        response.setImage(category.getImage());

        return response;
    }
}
