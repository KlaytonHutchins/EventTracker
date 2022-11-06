package com.skilldistillery.finance.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Deposit;

public interface DepositRepository extends JpaRepository<Deposit, Integer>{
	
	List<Deposit> findByBankAccountId(Integer bid);
	
}
