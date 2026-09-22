package com.example.UserService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.UserService.pojo.UserServiceDetails;
import com.example.UserService.pojo.serviceDetails;
import com.example.UserService.services.UserService;

import jakarta.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/userinfo")
public class UserController {

    @Autowired
    UserService us;


    // user selects service
    @PostMapping("/setservice")
    public ResponseEntity<?> getUserDetails(HttpServletRequest request,@RequestBody serviceDetails sd) {
        return  us.setService(sd);
    }

    // user press on set button and starts the service
    @PostMapping("/startservice")
    public ResponseEntity<?> startService(@RequestBody UserServiceDetails uds,HttpServletRequest request){
        String email = request.getHeader("X-User-Email");
        return us.saveServiceData(uds,email);
    }

    @PostMapping("/breached")
    public ResponseEntity<?> sendBreachedEmail(@RequestBody UserServiceDetails usd) {
        System.out.println("Email="+usd.getEmail());
        System.out.println("firstemail="+usd.getFirstEmail());
        us.sendBreachedEmail(usd);
        System.out.println("breached called");
        return ResponseEntity.ok("Breached email sent successfully");
    }
    
    @GetMapping("/fetchuser")
    public ResponseEntity<?> returnUserDetails(HttpServletRequest request) {
        System.out.println("Received request to fetch user details");

        String email = request.getHeader("X-User-Email");
        
        if (email == null) {
        System.out.println("ERROR: X-User-Email header is missing!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: X-User-Email header is missing!");
    }
        serviceDetails sd=us.fetchServiceDetails(email);
        if(sd==null){
            sd=new serviceDetails();
            sd.setEmail(email);
             System.out.println("No service details found for email: " + email);
             System.out.println("Service Type: null");
           
            System.out.println("No service details found for email: " + email);
             
        }else{
            System.out.println("Service details found for email: " + email);
             System.out.println("Service Type: " + sd.getType());
             System.out.println("Service Start Date: " + sd.getStartDate());
             System.out.println("Service End Date: " + sd.getEndDate());
        }
        return ResponseEntity.ok(sd);
    }


    

}
