package com.example.UserService.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.UserService.pojo.UserServiceDetails;





@Repository
public interface UserServiceRepo extends JpaRepository<UserServiceDetails, Integer>{


}
