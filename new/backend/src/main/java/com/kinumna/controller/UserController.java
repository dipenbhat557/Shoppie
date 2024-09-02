package com.kinumna.controller;

import com.kinumna.model.User;
import com.kinumna.payload.requests.UserInput;
import com.kinumna.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @QueryMapping
    public User getUser(@Argument Integer id) {
        return userService.findById(id);
    }

    @QueryMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @MutationMapping
    public User createUser(@Argument UserInput input, @Argument MultipartFile profilePicture) {
        return userService.createUser(input, profilePicture);
    }

    @MutationMapping
    public User updateUser(@Argument Integer id, @Argument UserInput input, @Argument MultipartFile profilePicture) {
        return userService.updateUser(id, input, profilePicture);
    }

    @MutationMapping
    public boolean deleteUser(@Argument Integer id) {
        return userService.deleteUser(id);
    }
}
