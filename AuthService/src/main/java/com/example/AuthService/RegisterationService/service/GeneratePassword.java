package com.example.AuthService.RegisterationService.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class GeneratePassword {
     private final PasswordEncoder passwordEncoder;

    public String generatePassword(String password){
        return passwordEncoder.encode(password);
    }
}
