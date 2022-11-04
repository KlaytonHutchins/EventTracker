package com.skilldistillery.finance.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.Account;
import com.skilldistillery.finance.services.AccountService;

@RestController
@RequestMapping("api")
public class AccountController {
	
	@Autowired
	private AccountService accountSvc;
	
	@GetMapping("accounts")
	public List<Account> listAccounts() {
		return accountSvc.listAllAccounts();
	}
	
}
