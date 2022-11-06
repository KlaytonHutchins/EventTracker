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
	
	@GetMapping("portfolios/{id}")
	public UserPortfolio showPortfolio(@PathVariable Integer id, HttpServletResponse resp) {
		UserPortfolio portfolio = portfolioSvc.showPortfolio(id);
		if (portfolio == null) {
			resp.setStatus(404);
		}
		return portfolio;
	}
	
	@PostMapping("portfolios")
	public UserPortfolio createPortfolio(@RequestBody UserPortfolio portfolio, HttpServletResponse resp, HttpServletRequest req) {
		portfolio = portfolioSvc.createPortfolio(portfolio);
		resp.setStatus(201);
		StringBuffer urlSb = req.getRequestURL();
		urlSb.append("/").append(portfolio.getId());
		String url = urlSb.toString();
		resp.setHeader("Location", url);
		return portfolio;
	}
	
	@PutMapping("portfolios/{id}")
	public UserPortfolio updatePortfolio(@PathVariable Integer id, @RequestBody UserPortfolio portfolio, HttpServletResponse resp) {
		if (portfolioSvc.showPortfolio(id) == null) {
			resp.setStatus(404);
			return null;
		}
		portfolio = portfolioSvc.updatePortfolio(id, portfolio);
		return portfolio;
	}
	
	@PutMapping("portfolios/{id}/changePassword")
	public UserPortfolio updatePortfolioPassword(@PathVariable Integer id, @RequestBody UserPortfolio portfolio, HttpServletResponse resp) {
		if (portfolioSvc.showPortfolio(id) == null) {
			resp.setStatus(404);
			return null;
		}
		portfolio = portfolioSvc.updatePortfolioPassword(id, portfolio.getPassword());
		return portfolio;
	}
	
	@DeleteMapping("portfolios/{id}")
	public void deletePortfolio(@PathVariable Integer id, HttpServletResponse resp) {
		if (portfolioSvc.showPortfolio(id) == null) {
			resp.setStatus(404);
			return;
		}
		boolean deleted = portfolioSvc.deletePortfolio(id);
		if (!deleted) {
			resp.setStatus(404);
		}
		resp.setStatus(204);
	}
	
}
