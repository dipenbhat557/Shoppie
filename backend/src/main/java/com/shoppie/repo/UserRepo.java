package com.shoppie.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shoppie.model.User;

public interface UserRepo extends JpaRepository<User, Integer>{

    User findByUsername(String username);

}