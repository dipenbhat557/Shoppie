package com.kinumna.service;

import com.kinumna.model.User;
import com.kinumna.payload.requests.UserInput;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    User findById(Integer id);

    List<User> findAll();

    User createUser(UserInput input, MultipartFile profilePicture);

    User updateUser(Integer id, UserInput input, MultipartFile profilePicture);

    boolean deleteUser(Integer id);

    String verifyUser(Integer id);
}