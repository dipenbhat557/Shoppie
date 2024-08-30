package com.shoppie.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoppie.model.User;
import com.shoppie.repo.UserRepo;
import com.shoppie.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public String getImage(int userId) throws Exception {
        User user = this.userRepo.findById(userId).orElseThrow(()->new Exception("User not found"));
        return user.getImg().toString();
    }
    
}
