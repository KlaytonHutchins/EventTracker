package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.UserPortfolio;

public interface UserPortfolioService {
	
	List<UserPortfolio> listAllPortfolios();
	UserPortfolio showPortfolio(int portfolioId);
	UserPortfolio createPortfolio(UserPortfolio portfolio);
	UserPortfolio updatePortfolio(int portfolioId, UserPortfolio portfolio);
	UserPortfolio updatePortfolioPassword(int portfolioId, String password);
	boolean deletePortfolio(int portfolioId);
	
}
