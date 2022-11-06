package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer>{

}
