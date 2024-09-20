package com.kinumna.service;

import java.util.List;

import com.kinumna.payload.responses.ProductOptionGroupResponse;


public interface ProductOptionGroupService {
    ProductOptionGroupResponse createOptionGroup(String optionGroupName);
    ProductOptionGroupResponse getOptionGroupById(Integer id);
    List<ProductOptionGroupResponse> getAllOptionGroups();
    List<ProductOptionGroupResponse> getByCategory(Integer categoryId);
    ProductOptionGroupResponse updateOptionGroup(Integer id, String optionGroupName);
    void deleteOptionGroup(Integer id);
}