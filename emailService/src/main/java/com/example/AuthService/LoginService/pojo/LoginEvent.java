package com.example.AuthService.LoginService.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginEvent {

    private String to;
    private String subject;
    private String body;

}
