package com.shoppie.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController{

    @RequestMapping
    public String test(){
        return "Hello world";
    }

}