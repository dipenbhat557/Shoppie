package com.kinumna.service;

import java.util.List;

import com.kinumna.model.ProductOptionGroup;

public interface ProductOptionGroupService {
    ProductOptionGroup createOptionGroup(ProductOptionGroup optionGroup);
    ProductOptionGroup getOptionGroupById(Integer id);
    List<ProductOptionGroup> getAllOptionGroups();
    ProductOptionGroup updateOptionGroup(Integer id, ProductOptionGroup optionGroup);
    void deleteOptionGroup(Integer id);
}