package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Deposit;

public interface DepositService {
	
	List<Deposit> listAllDeposits();
	Deposit showDeposit(int depositId);
	Deposit createDeposit(Deposit deposit);
	Deposit updateDeposit(int depositId, Deposit deposit);
	boolean deleteDeposit(int depositId);
	
}
