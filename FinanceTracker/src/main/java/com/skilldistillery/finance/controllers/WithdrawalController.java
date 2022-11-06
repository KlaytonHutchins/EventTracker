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
import com.skilldistillery.finance.entities.Withdrawal;
import com.skilldistillery.finance.services.WithdrawalService;

@RestController
@RequestMapping("api/portfolios/{pid}")
public class WithdrawalController {
	
	@Autowired
	private WithdrawalService withdrawalSvc;
	
	@GetMapping("bankAccounts/{bid}/withdrawals")
	public List<Withdrawal> listWithdrawals(@PathVariable Integer bid) {
		return withdrawalSvc.listAllWithdrawalsByBankId(bid);
	}
	
	@GetMapping("bankAccounts/{bid}/withdrawals/{wid}")
	public Withdrawal showWithdrawal(@PathVariable Integer bid, @PathVariable Integer wid) {
		return withdrawalSvc.showWithdrawal(wid, bid);
	}
	
	@PostMapping("bankAccounts/{bid}/withdrawals")
	public Withdrawal createWithdrawal(@PathVariable Integer bid, @RequestBody Withdrawal withdrawal, HttpServletResponse resp, HttpServletRequest req) {
		BankAccount ba = new BankAccount();
		ba.setId(bid);
		withdrawal.setBankAccount(ba);
		withdrawal = withdrawalSvc.createWithdrawal(withdrawal);
		resp.setStatus(201);
		StringBuffer urlSb = req.getRequestURL();
		urlSb.append("/").append(withdrawal.getId());
		String url = urlSb.toString();
		resp.setHeader("Location", url);
		return withdrawal;
	}
	
	@PutMapping("bankAccounts/{bid}/withdrawals/{wid}")
	public Withdrawal updateWithdrawal(@PathVariable Integer bid, @PathVariable Integer wid, @RequestBody Withdrawal withdrawal, HttpServletResponse resp) {
		if (withdrawalSvc.showWithdrawal(wid, bid) == null) {
			resp.setStatus(404);
			return null;
		}
		BankAccount ba = new BankAccount();
		ba.setId(bid);
		withdrawal.setBankAccount(ba);
		withdrawal = withdrawalSvc.updateWithdrawal(wid, withdrawal);
		return withdrawal;
	}
	
	@DeleteMapping("bankAccounts/{bid}/withdrawals/{wid}")
	public void deleteWithdrawal(@PathVariable Integer bid, @PathVariable Integer wid, HttpServletResponse resp) {
		if (withdrawalSvc.showWithdrawal(wid, bid) == null) {
			resp.setStatus(404);
			return;
		}
		boolean deleted = withdrawalSvc.deleteWithdrawal(wid);
		if (!deleted) {
			resp.setStatus(404);
		}
		resp.setStatus(204);
	}
	
}
