package com.cashier.app_spring.dto.request;

import lombok.Data;

@Data
public class ProductRequest {
    private String productName;
    private Integer price;
}
