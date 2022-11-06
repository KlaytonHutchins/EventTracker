package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Withdrawal;

public interface WithdrawalService {
	
	List<Withdrawal> listAllWithdrawals();
	Withdrawal showWithdrawal(int withdrawalId);
	Withdrawal createWithdrawal(Withdrawal withdrawal);
	Withdrawal updateWithdrawal(int withdrawalId, Withdrawal withdrawal);
	boolean deleteWithdrawal(int withdrawalId);
	
}
