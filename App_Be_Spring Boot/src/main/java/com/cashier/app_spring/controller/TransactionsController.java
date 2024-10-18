package com.cashier.app_spring.controller;

import com.cashier.app_spring.service.TransactionsService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Data
@RequestMapping("/api/v1/transactions")
public class TransactionsController {

    @Autowired
    private TransactionsService transactionsService;
    @GetMapping
    public ResponseEntity<Object> getTransactions(){
        return transactionsService.getTransactions();
    }

    @GetMapping("/{qrCode}")
    public ResponseEntity<Object> getTransactionByQrCode(@PathVariable String qrCode) {
        return transactionsService.getTransactionByQrCode(qrCode);
    }
}
