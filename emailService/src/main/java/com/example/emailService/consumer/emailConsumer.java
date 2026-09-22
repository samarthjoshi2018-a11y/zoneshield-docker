package com.example.emailService.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.example.AuthService.LoginService.pojo.LoginEvent;
import com.example.UserService.pojo.BreachedEvent;
import com.example.emailService.service.MailService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class emailConsumer {


    private final MailService mailservice;

    @KafkaListener(topics = "Login", groupId = "email-group")
    public void consumeLogin(LoginEvent event) {
        System.out.println("Received login event: " + event);
        mailservice.sendEmail(event);
    }

    @KafkaListener(topics = "Register", groupId = "email-group")
    public void consumeRegister(LoginEvent event) {
        System.out.println("Received event: " + event);
        mailservice.sendEmail(event);
    }

    @KafkaListener(topics = "Breached", groupId = "email-group")
    public void consumeBreached(BreachedEvent event) {
        System.out.println("Received event: " + event);
        System.out.println("Email reciced 1 "+event.getEmail1());
        mailservice.sendBreachedEmail(event);
    }

}
