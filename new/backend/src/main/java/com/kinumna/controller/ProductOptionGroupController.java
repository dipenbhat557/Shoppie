package com.kinumna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.kinumna.model.ProductOptionGroup;
import com.kinumna.service.ProductOptionGroupService;

import java.util.List;

@Controller
public class ProductOptionGroupController {

    @Autowired
    private ProductOptionGroupService optionGroupService;

    public List<ProductOptionGroup> getAllOptionGroups() {
        return optionGroupService.getAllOptionGroups();
    }

    public ProductOptionGroup getOptionGroupById(Integer id) {
        return optionGroupService.getOptionGroupById(id);
    }

    public ProductOptionGroup createOptionGroup(ProductOptionGroup optionGroup) {
        return optionGroupService.createOptionGroup(optionGroup);
    }

    public ProductOptionGroup updateOptionGroup(Integer id, ProductOptionGroup optionGroup) {
        return optionGroupService.updateOptionGroup(id, optionGroup);
    }

    public void deleteOptionGroup(Integer id) {
        optionGroupService.deleteOptionGroup(id);
    }
}
