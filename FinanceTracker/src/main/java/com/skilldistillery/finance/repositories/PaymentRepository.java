package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>{

}
