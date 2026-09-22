package com.example.ApiGateway;
import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {
    private static final String SECRET = "mysecretkey12345mysecretkey12345"; // at least 32 chars
    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));


    public Claims validateToken(String token){
        try{
            Claims claims = Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token).getBody();
            System.out.println("validating claims"+claims);
            return claims;
        }catch(Exception e){
            System.out.println("exception occured"+e.getMessage());
            return null;
        }
    }
    public  String getUserName(String token){
         return   Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token).getBody().getSubject();
    }


}

