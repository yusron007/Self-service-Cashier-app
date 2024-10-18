package com.cashier.app_spring.controller;

import com.cashier.app_spring.dto.request.CustomersRequest;
import com.cashier.app_spring.service.CustomersService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Data
@RequestMapping("/api/v1/customer")
public class CustomersController {
    @Autowired
    private CustomersService customersService;

    @PostMapping
    public ResponseEntity<Object> addCustomers (@RequestBody CustomersRequest customersRequest){
        return customersService.addCustomer(customersRequest);
    }

    @GetMapping
    public ResponseEntity<Object> getCustomer(){
        return customersService.getCustomer();
    }

    @GetMapping("/{qrCode}")
    public ResponseEntity<Object> getCustomerByQrCode(@PathVariable String qrCode) {
        return customersService.getCustomerById(qrCode);
    }

}
