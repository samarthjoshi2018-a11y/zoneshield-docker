package com.example.AuthService.LoginService.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.AuthService.LoginService.pojo.LoginEvent;

@Service
public class kafkaProducerService {
    
     @Autowired
    private KafkaTemplate<String, LoginEvent> kafkaTemplate;

    public void sendLoginEvent(LoginEvent event) {
        kafkaTemplate.send("Login", event);
        System.out.println("login email event sent to kafka.");
    }

    public void sendRegisterEvent(LoginEvent event){
        kafkaTemplate.send("Register", event);
        System.out.println("register email event sent to kafka.");
    }


}
