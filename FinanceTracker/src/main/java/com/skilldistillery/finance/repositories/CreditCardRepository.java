package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.CreditCard;

public interface CreditCardRepository extends JpaRepository<CreditCard, Integer> {

}
