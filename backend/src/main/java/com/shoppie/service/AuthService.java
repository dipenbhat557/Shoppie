package com.shoppie.service;

import org.springframework.web.multipart.MultipartFile;

import com.shoppie.model.User;
import com.shoppie.payload.SigninRequest;
import com.shoppie.payload.SignupRequest;

public interface AuthService{
    public User register(SignupRequest req, MultipartFile file) throws Exception;

    public User authenticate(SigninRequest req);
}