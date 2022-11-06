package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Withdrawal;

public interface WithdrawalService {
	
	List<Withdrawal> listAllWithdrawalsByBankId(int bid);
	Withdrawal showWithdrawal(int withdrawalId, int bankAcctId);
	Withdrawal createWithdrawal(Withdrawal withdrawal);
	Withdrawal updateWithdrawal(int withdrawalId, Withdrawal withdrawal);
	boolean deleteWithdrawal(int withdrawalId);
	
}
