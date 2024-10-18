package com.cashier.app_spring.controller;

import com.cashier.app_spring.dto.request.CustomersRequest;
import com.cashier.app_spring.dto.request.ProductRequest;
import com.cashier.app_spring.service.CustomersService;
import com.cashier.app_spring.service.ProductService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Data
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Object> addProduct (@RequestBody ProductRequest productRequest){
        return productService.addProduct(productRequest);
    }

    @GetMapping
    public ResponseEntity<Object> getProduct(){
        return productService.getProducts();
    }

    @GetMapping("/{rfId}")
    public ResponseEntity<Object> getProductByRfId(@PathVariable String rfId) {
        return productService.getProductById(rfId);
    }

}
