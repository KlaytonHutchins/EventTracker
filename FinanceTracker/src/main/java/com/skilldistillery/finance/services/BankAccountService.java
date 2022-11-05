package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.BankAccount;

public interface BankAccountService {
	
	List<BankAccount> listAllBankAccounts();
	BankAccount showBankAccount(int bankAccountId);
	BankAccount createBankAccount(BankAccount bankAccount);
	BankAccount updateBankAccount(int bankAccountId, BankAccount bankAccount);
	boolean deleteBankAccount(int bankAccountId);
	
}
