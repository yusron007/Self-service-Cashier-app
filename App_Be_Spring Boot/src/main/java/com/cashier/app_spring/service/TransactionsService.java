package com.cashier.app_spring.service;

import com.cashier.app_spring.dto.response.BodyResponse;
import com.cashier.app_spring.dto.response.CustomersResponse;
import com.cashier.app_spring.dto.response.ErrorResponse;
import com.cashier.app_spring.dto.response.TransactionsResponse;
import com.cashier.app_spring.model.Customers;
import com.cashier.app_spring.model.Transactions;
import com.cashier.app_spring.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionsService {

    @Autowired
    private TransactionsRepository transactionsRepository;
    public ResponseEntity<Object> getTransactions() {
        try {
            List<Transactions> transactions = transactionsRepository.findAll();

            if (transactions.isEmpty()) {
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .message(HttpStatus.NOT_FOUND.name())
                        .errors("No transactions found")
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            List<TransactionsResponse> transactionsResponses = transactions.stream().map(transaction -> {
                TransactionsResponse transactionsResponse = new TransactionsResponse();
                transactionsResponse.setId(String.valueOf(transaction.getId()));

                // Mapping CustomerData
                TransactionsResponse.CustomerData customerData = new TransactionsResponse.CustomerData();
                customerData.setQrCode(String.valueOf(transaction.getCustomer().getQrCode()));
                customerData.setName(transaction.getCustomer().getName());
                transactionsResponse.setCustomer(customerData);

                // Mapping ProductData
                TransactionsResponse.ProductData productData = new TransactionsResponse.ProductData();
                productData.setRfId(String.valueOf(transaction.getProduct().getRfId()));
                productData.setProductName(transaction.getProduct().getProductName());
                transactionsResponse.setProduct(productData);

                transactionsResponse.setPrice(transaction.getPrice());
                transactionsResponse.setQuantity(transaction.getQuantity());
                transactionsResponse.setTotalPrice(transaction.getTotalPrice());
                transactionsResponse.setDate(transaction.getDate());
                return transactionsResponse;
            }).collect(Collectors.toList());


            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Get Transactions Success")
                    .data(transactionsResponses)
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

    public ResponseEntity<Object> getTransactionByQrCode(String qrCode) {
        try {
            List<Transactions> transactionsList = transactionsRepository.findByCustomer_QrCode(qrCode);

            if (transactionsList.isEmpty()) {
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .message(HttpStatus.NOT_FOUND.name())
                        .errors("No transactions found for Customer with QR Code: " + qrCode)
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            List<TransactionsResponse> transactionsResponses = new ArrayList<>();
            for (Transactions transaction : transactionsList) {
                TransactionsResponse transactionsResponse = new TransactionsResponse();
                transactionsResponse.setId(String.valueOf(transaction.getId()));

                // Mapping CustomerData
                TransactionsResponse.CustomerData customerData = new TransactionsResponse.CustomerData();
                customerData.setQrCode(String.valueOf(transaction.getCustomer().getQrCode()));
                customerData.setName(transaction.getCustomer().getName());
                transactionsResponse.setCustomer(customerData);

                // Mapping ProductData
                TransactionsResponse.ProductData productData = new TransactionsResponse.ProductData();
                productData.setRfId(String.valueOf(transaction.getProduct().getRfId()));
                productData.setProductName(transaction.getProduct().getProductName());
                transactionsResponse.setProduct(productData);

                transactionsResponse.setPrice(transaction.getPrice());
                transactionsResponse.setQuantity(transaction.getQuantity());
                transactionsResponse.setTotalPrice(transaction.getTotalPrice());
                transactionsResponse.setDate(transaction.getDate());

                transactionsResponses.add(transactionsResponse);
            }

            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Get Transactions Success")
                    .data(transactionsResponses)
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
