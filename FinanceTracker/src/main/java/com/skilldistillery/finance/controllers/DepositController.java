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
import com.skilldistillery.finance.entities.Deposit;
import com.skilldistillery.finance.services.DepositService;

@RestController
@RequestMapping("api/portfolios/{pid}")
public class DepositController {
	
	@Autowired
	private DepositService depositSvc;
	
	@GetMapping("bankAccounts/{bid}/deposits")
	public List<Deposit> listDeposits(@PathVariable Integer bid) {
		return depositSvc.listAllDepositsByBankId(bid);
	}
	
	@GetMapping("bankAccounts/{bid}/deposits/{did}")
	public Deposit showDeposit(@PathVariable Integer bid, @PathVariable Integer did) {
		return depositSvc.showDeposit(did, bid);
	}
	
	@PostMapping("bankAccounts/{bid}/deposits")
	public Deposit createDeposit(@RequestBody Deposit deposit, HttpServletResponse resp, HttpServletRequest req) {
		deposit = depositSvc.createDeposit(deposit);
		resp.setStatus(201);
		StringBuffer urlSb = req.getRequestURL();
		urlSb.append("/").append(deposit.getId());
		String url = urlSb.toString();
		resp.setHeader("Location", url);
		return deposit;
	}
	
	@PutMapping("bankAccounts/{bid}/deposits/{did}")
	public Deposit updateDeposit(@PathVariable Integer bid, @PathVariable Integer did, @RequestBody Deposit deposit, HttpServletResponse resp) {
		if (depositSvc.showDeposit(did, bid) == null) {
			resp.setStatus(404);
			return null;
		}
		BankAccount ba = new BankAccount();
		ba.setId(bid);
		deposit.setBankAccount(ba);
		deposit = depositSvc.updateDeposit(did, deposit);
		return deposit;
	}
	
	@DeleteMapping("bankAccounts/{bid}/deposits/{did}")
	public void deleteDeposit(@PathVariable Integer bid, @PathVariable Integer did, HttpServletResponse resp) {
		if (depositSvc.showDeposit(did, bid) == null) {
			resp.setStatus(404);
			return;
		}
		boolean deleted = depositSvc.deleteDeposit(did);
		if (!deleted) {
			resp.setStatus(404);
		}
		resp.setStatus(204);
	}
	
}
