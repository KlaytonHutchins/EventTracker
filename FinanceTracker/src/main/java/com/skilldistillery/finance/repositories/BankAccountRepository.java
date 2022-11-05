package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.BankAccount;

public interface BankAccountRepository extends JpaRepository<BankAccount, Integer> {

}
