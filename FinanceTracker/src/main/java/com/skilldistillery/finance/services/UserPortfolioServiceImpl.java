package com.skilldistillery.finance.services;

import java.util.List;

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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserPortfolio createPortfolio(UserPortfolio portfolio) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserPortfolio updatePortfolio(int portfolioId, UserPortfolio portfolio) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deletePortfolio(int portfolioId) {
		// TODO Auto-generated method stub
		return false;
	}
	
}
