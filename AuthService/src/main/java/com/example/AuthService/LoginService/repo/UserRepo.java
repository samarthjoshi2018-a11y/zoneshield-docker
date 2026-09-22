package com.example.AuthService.LoginService.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.AuthService.LoginService.pojo.User;

public interface UserRepo extends JpaRepository<User, String>{

}
