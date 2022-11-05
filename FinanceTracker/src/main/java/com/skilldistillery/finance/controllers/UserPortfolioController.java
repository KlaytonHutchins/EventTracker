package com.skilldistillery.finance.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.UserPortfolio;
import com.skilldistillery.finance.services.UserPortfolioService;

@RestController
@RequestMapping("api")
public class UserPortfolioController {
	
	@Autowired
	private UserPortfolioService portfolioSvc;
	
	@GetMapping("portfolios")
	public List<UserPortfolio> listAccounts() {
		return portfolioSvc.listAllPortfolios();
	}
	
}
