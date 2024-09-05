package com.kinumna.controller;

import com.kinumna.model.User;
import com.kinumna.payload.requests.UserInput;
import com.kinumna.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    public User getUser( Integer id) {
        return userService.findById(id);
    }
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    public User createUser( UserInput input,  MultipartFile profilePicture) {
        return userService.createUser(input, profilePicture);
    }

    public User updateUser( Integer id,  UserInput input,  MultipartFile profilePicture) {
        return userService.updateUser(id, input, profilePicture);
    }

    public boolean deleteUser(int id) {
        return userService.deleteUser(id);
    }
}
