package com.example.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.AuthService.LoginService.pojo.User;
import com.example.AuthService.RegisterationService.service.RegisterationServices;

@RestController
@RequestMapping("/register")
public class registerationController {

    @Autowired
    RegisterationServices rs;

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@RequestBody User udetails) {
        try {
            if (rs.check(udetails)) {
                rs.Register(udetails);

                String token = rs.getToken(udetails);

                ResponseCookie cookie = ResponseCookie.from("jwt", token)
                        .httpOnly(true)
                        .secure(false)
                        .path("/")
                        .maxAge(24 * 60 * 60)
                        .build();

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body("Login successful");
            }

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("User already exist.");

        } catch (Exception e) {
            System.out.println("exception occured"+e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("User already exist.");
        }
    }
}
