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

}
