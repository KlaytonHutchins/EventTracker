package com.skilldistillery.finance.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.BankAccount;
import com.skilldistillery.finance.services.BankAccountService;

@RestController
@RequestMapping("api")
public class BankAccountController {
	
	@Autowired
	private BankAccountService bankAccountSvc;
	
	@GetMapping("bankAccounts")
	public List<BankAccount> listAccounts() {
		return bankAccountSvc.listAllBankAccounts();
	}
	
	@GetMapping("bankAccounts/{id}")
	public BankAccount showBankAccount(@PathVariable Integer id) {
		return bankAccountSvc.showBankAccount(id);
	}
	
	@PostMapping("bankAccounts")
	public BankAccount createBankAccount(@RequestBody BankAccount bankAccount, HttpServletResponse resp, HttpServletRequest req) {
		bankAccount = bankAccountSvc.createBankAccount(bankAccount);
		resp.setStatus(201);
		StringBuffer urlSb = req.getRequestURL();
		urlSb.append("/").append(bankAccount.getId());
		String url = urlSb.toString();
		resp.setHeader("Location", url);
		return bankAccount;
	}
	
	@PutMapping("bankAccounts/{id}")
	public BankAccount updateBankAccount(@PathVariable Integer id, @RequestBody BankAccount bankAccount, HttpServletResponse resp) {
		if (bankAccountSvc.showBankAccount(id) == null) {
			resp.setStatus(404);
			return null;
		}
		bankAccount = bankAccountSvc.updateBankAccount(id, bankAccount);
		return bankAccount;
	}
	
	@DeleteMapping("bankAccounts/{id}")
	public void deleteBankAccount(@PathVariable Integer id, HttpServletResponse resp) {
		if (bankAccountSvc.showBankAccount(id) == null) {
			resp.setStatus(404);
			return;
		}
		boolean deleted = bankAccountSvc.deleteBankAccount(id);
		if (!deleted) {
			resp.setStatus(404);
		}
		resp.setStatus(204);
	}
	
}
