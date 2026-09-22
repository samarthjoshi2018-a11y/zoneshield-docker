package com.example.emailService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.AuthService.LoginService.pojo.LoginEvent;
import com.example.UserService.pojo.BreachedEvent;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(LoginEvent event) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(event.getTo());
        message.setSubject(event.getSubject());
        message.setText(event.getBody());
        System.out.println("email sent ");
        mailSender.send(message);
    }

    public void sendBreachedEmail(BreachedEvent event) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(event.getEmail1());
        message.setSubject(event.getSubject());
        message.setText(event.getBody());
        System.out.println("email sent 1 ");
        mailSender.send(message);

        SimpleMailMessage message2 = new SimpleMailMessage();
        message2.setTo(event.getEmail2());
        message2.setSubject(event.getSubject());
        message2.setText(event.getBody());
        System.out.println("email sent 2 ");
        mailSender.send(message2);

        SimpleMailMessage message3 = new SimpleMailMessage();
        message3.setTo(event.getEmail3());  
        message3.setSubject(event.getSubject());
        message3.setText(event.getBody());
        System.out.println("email sent 3 ");
        mailSender.send(message3);
    }
}