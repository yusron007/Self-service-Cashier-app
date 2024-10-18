package com.cashier.app_spring.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
    private String message;
    private int statusCode;
    private String status;
    private Object errors;
}