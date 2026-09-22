package com.example.AuthService.LoginService.services;


import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.AuthService.LoginService.pojo.LoginEvent;
import com.example.AuthService.LoginService.pojo.User;
import com.example.AuthService.LoginService.repo.UserRepo;



@Service
public class AuthenticationService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo rs;
    
    @Autowired
    private ClaimBuilder cb;

    @Autowired
    private kafkaProducerService kafkaProducerService;

    public String login(User u) {

        User user = userRepo.findById(u.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("authenticating");
        if (!passwordEncoder.matches(u.getPassword(), user.getPassword())) {
            System.out.println("incorrect password");
            throw new RuntimeException("Invalid credentials");
        }
        System.out.println("user authenticated successfully");

        Optional<User> ud=rs.findById(user.getEmail());
        
        Map<String, Object> claims = cb.buildClaims(ud);


        return jwtService.generateToken(ud, claims);
    }

    public void generateLoginEmail(User user) {
        LoginEvent event = new LoginEvent();
        event.setTo(user.getEmail());
        event.setFrom("22bcs162@ietdavv.edu.in");
        event.setSubject("Welcome to our application.");
        event.setBody("You have logged in into application recently");

        kafkaProducerService.sendLoginEvent(event);
        System.out.println("email event sent to kafka");
    }

    public void generateRegisterEmail(User user){
        LoginEvent event = new LoginEvent();
        event.setTo(user.getEmail());
        event.setFrom("22bcs162@ietdavv.edu.in");
        event.setSubject("Welcome to our application.");
        event.setBody("You have successfully registered in into application recently");

        kafkaProducerService.sendRegisterEvent(event);
        System.out.println("email event sent to kafka");
    }

}
