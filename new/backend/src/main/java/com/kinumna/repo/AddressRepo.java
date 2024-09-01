package com.kinumna.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kinumna.model.Address;

public interface AddressRepo extends JpaRepository<Address,Integer> {
    
}
