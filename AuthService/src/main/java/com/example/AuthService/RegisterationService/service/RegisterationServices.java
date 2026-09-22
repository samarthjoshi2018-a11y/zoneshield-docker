package com.example.AuthService.RegisterationService.service;


import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.AuthService.LoginService.pojo.User;
import com.example.AuthService.LoginService.repo.UserRepo;
import com.example.AuthService.LoginService.services.ClaimBuilder;
import com.example.AuthService.LoginService.services.JwtService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RegisterationServices {
    
    @Autowired
    ClaimBuilder cb;

    @Autowired
    JwtService jwtService;

    @Autowired
    private GeneratePassword gpassword; 


    @Autowired
    UserRepo urepo;

    public void Register(User u) {
        User us=urepo.findById(u.getEmail()).orElse(null);
        if(us!=null){
            throw new RuntimeException("User already exist.");
        }
        String encodedPassword=gpassword.generatePassword(u.getPassword());
        System.out.println("encoded password: " + encodedPassword);
        u.setPassword(encodedPassword);
        urepo.save(u);
    }

    public boolean check(User u) {
        Optional<User> u1 = urepo.findById(u.getEmail());
        System.out.println("user checked in database: " + u1.isPresent());
        return u1.isEmpty(); 
    }

    public String getToken(User u) {
        Optional<User> ud = Optional.of(u);
        Map<String,Object> claims=cb.buildClaims(ud);
        return jwtService.generateToken(ud, claims);
    }

}
