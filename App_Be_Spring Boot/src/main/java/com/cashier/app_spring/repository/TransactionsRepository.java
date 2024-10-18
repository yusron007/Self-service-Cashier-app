package com.cashier.app_spring.repository;

import com.cashier.app_spring.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, UUID> {
    List<Transactions> findByCustomer_QrCode(String qrCode); // Mengembalikan list, bukan optional
}

