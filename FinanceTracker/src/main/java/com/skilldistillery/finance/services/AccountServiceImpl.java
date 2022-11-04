package com.skilldistillery.finance.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Account;
import com.skilldistillery.finance.repositories.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {
	
	@Autowired
	private AccountRepository accountRepo;

	@Override
	public List<Account> listAllAccounts() {
		return accountRepo.findAll();
	}

	@Override
	public Account showAccount(int accountId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Account createAccount(Account account) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Account updateAccount(int accountId, Account account) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteAccount(int accountId) {
		// TODO Auto-generated method stub
		return false;
	}

}
