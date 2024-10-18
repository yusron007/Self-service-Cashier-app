package com.cashier.app_spring.dto.response;

import lombok.Data;

@Data
public class CustomersResponse {
    private String qrCode;
    private String name;
    private Integer wallet;
}
