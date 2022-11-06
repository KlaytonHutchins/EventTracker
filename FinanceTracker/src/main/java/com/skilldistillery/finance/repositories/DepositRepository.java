package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Deposit;

public interface DepositRepository extends JpaRepository<Deposit, Integer>{

}
