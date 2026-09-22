package com.example.UserService.pojo;
import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class UserServiceDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String firstEmail;
    private String secondEmail;
    private String thirdEmail;
    
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "lat", column = @Column(name = "center_lat")),
        @AttributeOverride(name = "lng", column = @Column(name = "center_lng"))
    })
    private Center center;
    private float lat;
    private float lng;
    private float radius=50;
    private LocalDate date;
}
