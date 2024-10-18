package com.cashier.app_spring.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransactionsResponse {
    private String id;
    private CustomerData customer;
    private ProductData product;
    private Integer price;
    private Integer quantity;
    private Integer totalPrice;
    private LocalDateTime date;

    @Data
    public static class CustomerData{
        private String qrCode;
        private String name;
    }

    @Data
    public static class ProductData{
        private String rfId;
        private String productName;
    }

}
