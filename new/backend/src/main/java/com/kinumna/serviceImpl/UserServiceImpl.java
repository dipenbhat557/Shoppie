package com.kinumna.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.model.User;
import com.kinumna.payload.requests.UserInput;
import com.kinumna.repo.UserRepo;
import com.kinumna.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepository;

    @Override
    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public User createUser(UserInput input, MultipartFile profilePicture) {
        User user = new User();
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPhoneNo(input.getPhoneNumber());
        user.setPassword(input.getPassword());
        user.setDob(input.getDob());

        if(profilePicture != null){
            try {
                user.setProfile(profilePicture.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Integer id, UserInput input, MultipartFile profilePicture) {
        User user = findById(id);

        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPhoneNo(input.getPhoneNumber());
        user.setPassword(input.getPassword());
        user.setDob(input.getDob());

        if(profilePicture != null){
            try {
                user.setProfile(profilePicture.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        return userRepository.save(user);
    }

    @Override
    public boolean deleteUser(Integer id) {
        userRepository.deleteById(id);
        return true;
    }
    
}
