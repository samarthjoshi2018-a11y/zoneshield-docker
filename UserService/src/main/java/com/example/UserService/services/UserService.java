package com.example.UserService.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.UserService.kafkaservices.kafkaProducerService;
import com.example.UserService.pojo.BreachedEvent;
import com.example.UserService.pojo.UserServiceDetails;
import com.example.UserService.pojo.serviceDetails;
import com.example.UserService.repo.ServiceDetailsRepo;
import com.example.UserService.repo.UserServiceRepo;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserService {

    @Autowired
    private UserServiceRepo usrepo;

    @Autowired
    private kafkaProducerService kservice;

    @Autowired
    private ServiceDetailsRepo srepo;

    // public boolean checkValidity(serviceDetails sd) {
    // LocalDate today = LocalDate.now();
    // LocalDate endDate = sd.getEndDate();
    // if (today.isAfter(endDate)) {
    // return false;
    // }
    // return true;
    // }

    public  ResponseEntity<?> setService(serviceDetails sd) {
        sd.setEmail(sd.getEmail());
        System.out.println("Setting service for email: " + sd.getEmail());
        sd.setStartDate(LocalDate.now());
        sd.setEndDate(LocalDate.now().plusDays(30));
        srepo.save(sd);        
        return ResponseEntity.ok(sd);
    }

    public ResponseEntity<?> saveServiceData(UserServiceDetails uds, String email) {
        // serviceDetails sds=srepo.findByEmail(uds.getEmail());
        uds.setEmail(email);
        uds.setDate(LocalDate.now());

        // if(checkValidity(sds)){
        System.out.println("Saving service data for email: " + uds.getEmail());
        usrepo.save(uds);
        return ResponseEntity.ok("service registered successfully");
        // }
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    public void sendBreachedEmail(UserServiceDetails usd) {
      
        System.out.println("breached called");
        BreachedEvent event = new BreachedEvent();
        System.out.println("breached email send called");
        event.setEmail1(usd.getFirstEmail());
        event.setEmail2(usd.getSecondEmail());
        event.setEmail3(usd.getThirdEmail());
        event.setFrom("22bcs162@ietdavv.edu.in");
        event.setSubject("Account Breach Alert");
        event.setBody(
                "You are registered as a trusted contact for a user whose account has been breached. Please take necessary precautions to secure your user.");
        kservice.sendBreachedEmail(event);
    }

    public serviceDetails fetchServiceDetails(String email) {

        return srepo.findByEmail(email);
    }

}
