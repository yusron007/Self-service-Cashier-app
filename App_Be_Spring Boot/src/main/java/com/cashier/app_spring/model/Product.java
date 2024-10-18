package com.cashier.app_spring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "product", schema = "public")
public class Product {

    @Id
    @Column(name = "rf_id")
    private String rfId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "price")
    private Integer price;
}
