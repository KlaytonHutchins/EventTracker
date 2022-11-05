package com.skilldistillery.finance.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.finance.entities.UserPortfolio;

public interface UserPortfolioRepository extends JpaRepository<UserPortfolio, Integer> {

}
