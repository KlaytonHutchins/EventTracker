package com.skilldistillery.finance.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.CreditCard;
import com.skilldistillery.finance.entities.UserPortfolio;
import com.skilldistillery.finance.entities.Withdrawal;
import com.skilldistillery.finance.services.CreditCardService;

@RestController
@RequestMapping("api/portfolios/{pid}")
@CrossOrigin({"*", "http://localhost/"})
public class CreditCardController {
	
	@Autowired
	private CreditCardService creditCardSvc;
	
	@GetMapping("creditCards")
	public List<CreditCard> listCards() {
		return creditCardSvc.listAllCreditCards();
	}
	
	@GetMapping("creditCards/{id}")
	public CreditCard showCreditCard(@PathVariable Integer id, HttpServletResponse resp) {
		CreditCard creditCard = creditCardSvc.showCreditCard(id);
		if (creditCard == null) {
			resp.setStatus(404);
		}
		return creditCard;
	}
	
	@PostMapping("creditCards")
	public CreditCard createCreditCard(@PathVariable Integer pid, @RequestBody CreditCard creditCard, HttpServletResponse resp, HttpServletRequest req) {
		UserPortfolio port = new UserPortfolio();
		port.setId(pid);
		creditCard.setUserPortfolio(port);
		creditCard = creditCardSvc.createCreditCard(creditCard);
		resp.setStatus(201);
		StringBuffer urlSb = req.getRequestURL();
		urlSb.append("/").append(creditCard.getId());
		String url = urlSb.toString();
		resp.setHeader("Location", url);
		return creditCard;
	}
	
	@PutMapping("creditCards/{id}")
	public CreditCard updateCreditCard(@PathVariable Integer id, @RequestBody CreditCard creditCard, HttpServletResponse resp) {
		if (creditCardSvc.showCreditCard(id) == null) {
			resp.setStatus(404);
			return null;
		}
		creditCard = creditCardSvc.updateCreditCard(id, creditCard);
		return creditCard;
	}
	
	@DeleteMapping("creditCards/{id}")
	public void deleteCreditCard(@PathVariable Integer id, HttpServletResponse resp) {
		if (creditCardSvc.showCreditCard(id) == null) {
			resp.setStatus(404);
			return;
		}
		boolean deleted = creditCardSvc.deleteCreditCard(id);
		if (!deleted) {
			resp.setStatus(404);
		}
		resp.setStatus(204);
	}
	
}
