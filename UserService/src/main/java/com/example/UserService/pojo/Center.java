package com.example.UserService.pojo;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Center {
    private float lat;
    private float lng;
}
