package com.cashier.app_spring.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BodyResponse {
    private String message;
    private int statusCode;
    private String status;
    private Object data;
}
