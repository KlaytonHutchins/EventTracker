package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Account;

public interface AccountService {
	
	List<Account> listAllAccounts();
	Account showAccount(int accountId);
	Account createAccount(Account account);
	Account updateAccount(int accountId, Account account);
	boolean deleteAccount(int accountId);
	
}
