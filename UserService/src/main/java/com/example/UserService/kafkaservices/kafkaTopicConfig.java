package com.example.UserService.kafkaservices;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class kafkaTopicConfig {
    @Bean
    public NewTopic breachedEmailTopic() {
        return TopicBuilder.name("Breached")
                .partitions(1)
                .replicas(1)
                .build();
    }
}
