package com.skilldistillery.finance.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Withdrawal;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Integer>{
	
	List<Withdrawal> findByBankAccountId(Integer bid);
	
}
