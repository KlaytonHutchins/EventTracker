package com.skilldistillery.finance.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.UserPortfolio;
import com.skilldistillery.finance.repositories.UserPortfolioRepository;

@Service
public class UserPortfolioServiceImpl implements UserPortfolioService {
	
	@Autowired
	private UserPortfolioRepository portfolioRepo;
	
	@Override
	public List<UserPortfolio> listAllPortfolios() {
		return portfolioRepo.findAll();
	}

	@Override
	public UserPortfolio showPortfolio(int portfolioId) {
		Optional<UserPortfolio> op = portfolioRepo.findById(portfolioId);
		UserPortfolio portfolio = null;
		if (op.isPresent()) {
			portfolio = op.get();
		}
		return portfolio;
	}

	@Override
	public UserPortfolio createPortfolio(UserPortfolio portfolio) {
		portfolioRepo.saveAndFlush(portfolio);
		return portfolio;
	}

	@Override
	public UserPortfolio updatePortfolio(int portfolioId, UserPortfolio portfolio) {
		UserPortfolio dbPortfolio = showPortfolio(portfolioId);
		if (portfolio.getFirstName() != null) {
			dbPortfolio.setFirstName(portfolio.getFirstName());
		}
		if (portfolio.getLastName() != null) {
			dbPortfolio.setLastName(portfolio.getLastName());
		}
		if (portfolio.getEmail() != null) {
			dbPortfolio.setEmail(portfolio.getEmail());
		}
		portfolioRepo.saveAndFlush(dbPortfolio);
		return dbPortfolio;
	}
	
	@Override
	public UserPortfolio updatePortfolioPassword(int portfolioId, String password) {
		UserPortfolio dbPortfolio = showPortfolio(portfolioId);
		dbPortfolio.setPassword(password);
		portfolioRepo.saveAndFlush(dbPortfolio);
		return dbPortfolio;
	}

	@Override
	public boolean deletePortfolio(int portfolioId) {
		portfolioRepo.deleteById(portfolioId);
		if (portfolioRepo.findById(portfolioId) != null) {
			return false;
		} else {
			return true;
		}
	}
	
}
