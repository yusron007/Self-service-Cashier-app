package com.cashier.app_spring.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "customers", schema = "public")
public class Customers {

    @Id
    @Column(name = "qr_code")
    private String qrCode;

    @Column(name = "name")
    private String name;

    @Column(name = "wallet")
    private Integer wallet;

}
