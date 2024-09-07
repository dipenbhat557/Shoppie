package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.User;

public interface UserRepo extends JpaRepository<User,Integer> {
    
}
