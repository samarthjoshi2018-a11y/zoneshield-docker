package com.example.AuthService.LoginService.services;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.AuthService.LoginService.pojo.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {


    private static final String SECRET_KEY = "mysecretkey12345mysecretkey12345";

    public static Key getSignKey() {
        byte[] keyBytes = SECRET_KEY.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Optional<User> ud, Map<String, Object> claims) {
         
        User user = ud.orElseThrow(() ->
                new RuntimeException("User not found"));

        return Jwts.builder()
                .setSubject(user.getEmail())
                .addClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSignKey())
                .compact();
    }
}
