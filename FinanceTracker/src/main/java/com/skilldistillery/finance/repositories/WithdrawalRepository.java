package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Withdrawal;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Integer>{

}
