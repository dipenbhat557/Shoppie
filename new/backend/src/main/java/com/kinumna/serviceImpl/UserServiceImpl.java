package com.kinumna.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kinumna.exception.ResourceNotFoundException;
import com.kinumna.model.User;
import com.kinumna.payload.ObjectFromInput;
import com.kinumna.payload.requests.UserInput;
import com.kinumna.repo.UserRepo;
import com.kinumna.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ObjectFromInput objectFromInput;

    @Override
    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public User createUser(UserInput input, MultipartFile profilePicture) {
        User user = new User();
        
        user = this.objectFromInput.getUser(user, input, profilePicture);
        
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Integer id, UserInput input, MultipartFile profilePicture) {
        User user = findById(id);

        user = this.objectFromInput.getUser(user, input, profilePicture);
        
        return userRepository.save(user);
    }

    @Override
    public boolean deleteUser(Integer id) {
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public String verifyUser(Integer id){
        User user = findById(id);

        user.setVerified(true);

        this.userRepository.save(user);

        return "User verified successfully";
    }
    
}
