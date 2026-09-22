package com.example.AuthService.LoginService.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class LoginEvent {
    private String email;
    private String to;
    private String from;
    private String body; 
    private String subject;
}
