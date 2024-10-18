package com.cashier.app_spring.dto.response;

import lombok.Data;

@Data
public class ProductResponse {
    private String rfId;
    private String productName;
    private Integer price;
}
