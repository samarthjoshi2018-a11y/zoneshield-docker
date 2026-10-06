package com.example.UserService;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.UserService.kafkaservices.kafkaProducerService;
import com.example.UserService.pojo.BreachedEvent;
import com.example.UserService.pojo.Center;
import com.example.UserService.pojo.UserServiceDetails;
import com.example.UserService.pojo.serviceDetails;
import com.example.UserService.repo.ServiceDetailsRepo;
import com.example.UserService.repo.UserServiceRepo;
import com.example.UserService.services.UserService;



@ExtendWith (MockitoExtension.class)
public class UserServiceTests {

    @Mock 
    private ServiceDetailsRepo srepo;

    @Mock 
    private UserServiceRepo usrepo;

    @InjectMocks 
    private UserService userservice;

    @Mock
    private kafkaProducerService kservice;

    @Test 
    void setService_shouldSetDatesAndSave(){
       
        serviceDetails sd=new serviceDetails();
        sd.setEmail("abc@gmail.com");
        sd.setType("basic");
        
        when(srepo.save(sd)).thenReturn(sd);
        
        ResponseEntity<?> response=userservice.setService(sd);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(sd,response.getBody());
        assertEquals(LocalDate.now(),sd.getStartDate());
        assertEquals(LocalDate.now().plusDays(30),sd.getEndDate());

        verify(srepo).save(sd);

    }

    @Test
    void saveServiceData_Test(){

        UserServiceDetails uds=new UserServiceDetails();
        uds.setEmail("abc@gmail.com");
        uds.setDate(LocalDate.now());
        uds.setFirstEmail("abc1@gmail.com");
        uds.setThirdEmail("abc3@gmail.com");
        uds.setSecondEmail("abc2@gmail.com");

        uds.setLat(12.34f);
        uds.setLng(56.78f);
        
        Center center=new Center();
        center.setLat(12.34f);
        center.setLng(56.78f);
        uds.setCenter(center);

        when(usrepo.save(uds)).thenReturn(uds);

        ResponseEntity<?> response=userservice.saveServiceData(uds, uds.getEmail());
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("service registered successfully", response.getBody());
        assertEquals("abc@gmail.com", uds.getEmail());
        assertEquals(LocalDate.now(), uds.getDate());
        assertEquals(center, uds.getCenter());
        assertEquals(12.34f, uds.getLat());
        assertEquals(56.78f, uds.getLng());
        assertEquals("abc1@gmail.com", uds.getFirstEmail());
        assertEquals("abc3@gmail.com", uds.getThirdEmail());
        assertEquals("abc2@gmail.com", uds.getSecondEmail());

        verify(usrepo).save(uds);
    }

    @Test
    void sendBreachedEmailTest(){
        UserServiceDetails uds=new UserServiceDetails();
        uds.setEmail("abc@gmail.com");
        uds.setDate(LocalDate.now());
        uds.setFirstEmail("abc1@gmail.com");
        uds.setThirdEmail("abc3@gmail.com");
        uds.setSecondEmail("abc2@gmail.com");

        uds.setLat(12.34f);
        uds.setLng(56.78f);
        
        Center center=new Center();
        center.setLat(12.34f);
        center.setLng(56.78f);
        uds.setCenter(center);
        
        userservice.sendBreachedEmail(uds);

        ArgumentCaptor<BreachedEvent> captor=ArgumentCaptor.forClass(BreachedEvent.class);
        verify(kservice).sendBreachedEmail(captor.capture());
        BreachedEvent event=captor.getValue();
        assertEquals("abc1@gmail.com",event.getEmail1());
        assertEquals("abc2@gmail.com",event.getEmail2());
        assertEquals("abc3@gmail.com",event.getEmail3());
        assertEquals("22bcs162@ietdavv.edu.in",event.getFrom());
        assertEquals("Account Breach Alert",event.getSubject());


    }

    @Test 
    public void fetchServiceDetailsByEmailTest(){
        String email="abc@gmail.com";
        serviceDetails sd=new serviceDetails();
        sd.setEmail(email);
        when(srepo.findByEmail(email)).thenReturn(sd);

        serviceDetails result=userservice.fetchServiceDetails(email);
        assertEquals(sd, result);
        verify(srepo).findByEmail(email);


}
}