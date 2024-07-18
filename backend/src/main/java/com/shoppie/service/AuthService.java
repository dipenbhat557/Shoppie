package com.shoppie.service;

import com.shoppie.model.User;
import com.shoppie.payload.SigninRequest;
import com.shoppie.payload.SignupRequest;

public interface AuthService{
    public User register(SignupRequest req);

    public User authenticate(SigninRequest req);
}