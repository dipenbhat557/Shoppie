package com.kinumna.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import com.kinumna.model.ProductOptionGroup;
import com.kinumna.service.ProductOptionGroupService;

import java.util.List;

@Controller
public class ProductOptionGroupController {

    @Autowired
    private ProductOptionGroupService optionGroupService;

    @QueryMapping
    public List<ProductOptionGroup> getAllOptionGroups() {
        return optionGroupService.getAllOptionGroups();
    }

    @QueryMapping
    public ProductOptionGroup getOptionGroupById(Integer id) {
        return optionGroupService.getOptionGroupById(id);
    }

    @MutationMapping
    public ProductOptionGroup createOptionGroup(ProductOptionGroup optionGroup) {
        return optionGroupService.createOptionGroup(optionGroup);
    }

    @MutationMapping
    public ProductOptionGroup updateOptionGroup(Integer id, ProductOptionGroup optionGroup) {
        return optionGroupService.updateOptionGroup(id, optionGroup);
    }

    @MutationMapping
    public void deleteOptionGroup(Integer id) {
        optionGroupService.deleteOptionGroup(id);
    }
}
