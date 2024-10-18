package com.cashier.app_spring.service;

import com.cashier.app_spring.dto.request.CustomersRequest;
import com.cashier.app_spring.dto.request.ProductRequest;
import com.cashier.app_spring.dto.response.BodyResponse;
import com.cashier.app_spring.dto.response.CustomersResponse;
import com.cashier.app_spring.dto.response.ErrorResponse;
import com.cashier.app_spring.dto.response.ProductResponse;
import com.cashier.app_spring.model.Customers;
import com.cashier.app_spring.model.Product;
import com.cashier.app_spring.repository.CustomersRepository;
import com.cashier.app_spring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<Object> addProduct(ProductRequest productRequest) {
        try {
            Product product = new Product();
            product.setRfId(UUID.randomUUID().toString());
            product.setProductName(productRequest.getProductName());
            product.setPrice(productRequest.getPrice());
            productRepository.save(product);

            ProductResponse productResponse = new ProductResponse();
            productResponse.setRfId(product.getRfId());
            productResponse.setProductName(product.getProductName());
            productResponse.setPrice(product.getPrice());

            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Add Product Success")
                    .data(productResponse)
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

    public ResponseEntity<Object> getProducts() {
        try {
            List<Product> products = productRepository.findAll();

            if (products.isEmpty()) {
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .message(HttpStatus.NOT_FOUND.name())
                        .errors("No products found")
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            List<ProductResponse> productResponses = products.stream().map(product -> {
                ProductResponse productResponse = new ProductResponse();
                productResponse.setRfId(product.getRfId());
                productResponse.setProductName(product.getProductName());
                productResponse.setPrice(product.getPrice());
                return productResponse;
            }).collect(Collectors.toList());

            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Get Products Success")
                    .data(productResponses)
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

    public ResponseEntity<Object> getProductById(String rfId) {
        try {
            Optional<Product> productOptional = productRepository.findById(rfId);

            if (productOptional.isEmpty()) {
                ErrorResponse errorResponse = ErrorResponse.builder()
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .message(HttpStatus.NOT_FOUND.name())
                        .errors("No product found with RF ID: " + rfId)
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            Product product = productOptional.get();
            ProductResponse productResponse = new ProductResponse();
            productResponse.setRfId(product.getRfId());
            productResponse.setProductName(product.getProductName());
            productResponse.setPrice(product.getPrice());

            BodyResponse response = BodyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .status(HttpStatus.OK.name())
                    .message("Get Product Detail Success")
                    .data(productResponse)
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