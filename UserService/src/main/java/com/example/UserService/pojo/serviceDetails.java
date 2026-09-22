package com.example.UserService.pojo;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class serviceDetails {
    @Id
    private String email;
    private LocalDate startDate;
    private LocalDate endDate;
    private String type;
    
}
