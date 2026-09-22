package com.example.UserService.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.UserService.pojo.serviceDetails;


@Repository
public interface ServiceDetailsRepo extends JpaRepository<serviceDetails, String>{
    public serviceDetails findByEmail(String email);
    
}
