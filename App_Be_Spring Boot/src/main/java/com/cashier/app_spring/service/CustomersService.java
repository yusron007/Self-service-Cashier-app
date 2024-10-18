package com.cashier.app_spring.service;

import com.cashier.app_spring.dto.request.CustomersRequest;
import com.cashier.app_spring.dto.response.BodyResponse;
import com.cashier.app_spring.dto.response.CustomersResponse;
import com.cashier.app_spring.dto.response.ErrorResponse;
import com.cashier.app_spring.model.Customers;
import com.cashier.app_spring.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CustomersService {

    @Autowired
    private CustomersRepository customersRepository;

    public ResponseEntity<Object> addCustomer(CustomersRequest customersRequest) {
        try {
            Customers customer = new Customers();
            customer.setQrCode(UUID.randomUUID().toString());
            customer.setName(customersRequest.getName());
            customer.setWallet(customersRequest.getWallet());
            customersRepository.save(customer);

            CustomersResponse customersResponse = new CustomersResponse();
            customersResponse.setQrCode(customer.getQrCode());
            customersResponse.setName(customer.getName());
            customersResponse.setWallet(customer.getWallet());

            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Add Customers Success")
                    .data(customersResponse)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message(HttpStatus.INTERNAL_SERVER_ERROR.name())
                    .errors(e.getMessage())
                    .build();
            return ResponseEntity.ok().body(errorResponse);
        }
    }

    public ResponseEntity<Object> getCustomer() {
        try {
            List<Customers> customers = customersRepository.findAll();

            if (customers.isEmpty()) {
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .message(HttpStatus.NOT_FOUND.name())
                        .errors("No customers found")
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            List<CustomersResponse> customersResponses = customers.stream().map(customer -> {
                CustomersResponse customersResponse = new CustomersResponse();
                customersResponse.setQrCode(customer.getQrCode());
                customersResponse.setName(customer.getName());
                customersResponse.setWallet(customer.getWallet());
                return customersResponse;
            }).collect(Collectors.toList());

            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Get Customers Success")
                    .data(customersResponses)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message(HttpStatus.INTERNAL_SERVER_ERROR.name())
                    .errors(e.getMessage())
                    .build();
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    public ResponseEntity<Object> getCustomerById(String qrCode) {
        try {
            Optional<Customers> customerOptional = customersRepository.findById(qrCode);

            if (customerOptional.isEmpty()) {
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .message(HttpStatus.NOT_FOUND.name())
                        .errors("No customer found with QR Code: " + qrCode)
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            Customers customer = customerOptional.get();
            CustomersResponse customersResponse = new CustomersResponse();
            customersResponse.setQrCode(customer.getQrCode());
            customersResponse.setName(customer.getName());
            customersResponse.setWallet(customer.getWallet());

            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Get Detail Customer Success")
                    .data(customersResponse)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ErrorResponse errorResponse = ErrorResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message(HttpStatus.INTERNAL_SERVER_ERROR.name())
                    .errors(e.getMessage())
                    .build();
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

}
