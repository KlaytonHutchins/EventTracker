package com.skilldistillery.finance.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>{
	
	List<Payment> findByCreditCardId(Integer bid);
	
}
