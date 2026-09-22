package com.example.ApiGateway;

import org.springframework .boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiGatewayApplication {

	public static void main(String[] args) {
		System.out.println("Api gateway hit");
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

}
