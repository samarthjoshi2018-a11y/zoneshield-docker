package com.example.AuthService.LoginService.services;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.AuthService.LoginService.pojo.User;



@Service
public class ClaimBuilder {
    public Map<String, Object> buildClaims(Optional<User> ud) {

        User user = ud.orElseThrow(() ->
                new RuntimeException("User not found"));

        Map<String, Object> claims = new HashMap<>();

            claims.put("email", user.getEmail());
            
            
        return claims;
    }
}
