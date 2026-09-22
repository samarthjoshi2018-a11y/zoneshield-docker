package com.example.UserService.kafkaservices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.UserService.pojo.BreachedEvent;

@Service
public class kafkaProducerService {
    
     @Autowired
    private KafkaTemplate<String, BreachedEvent> kafkaTemplate;

    public void sendBreachedEmail(BreachedEvent breachedEvent) {
        kafkaTemplate.send("Breached", breachedEvent);
        System.out.println("Breached email sent to Kafka topic: " + breachedEvent.getEmail1() + ", " + breachedEvent.getEmail2() + ", " + breachedEvent.getEmail3());
    }
}
