package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.Account;

public interface AccountRepository extends JpaRepository<Account, Integer>{

}
