package com.example.AuthService;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class kafkaTopicConfig {
 @Bean
    public NewTopic myLoginTopic() {
        return TopicBuilder.name("Login")
                .partitions(1)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic myRegisterTopic() {
        return TopicBuilder.name("Register")
                .partitions(1)
                .replicas(1)
                .build();
    }
}
