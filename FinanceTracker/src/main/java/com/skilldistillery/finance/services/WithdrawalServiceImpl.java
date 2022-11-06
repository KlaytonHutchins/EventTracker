package com.skilldistillery.finance.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Withdrawal;
import com.skilldistillery.finance.repositories.WithdrawalRepository;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {
	
	@Autowired
	private WithdrawalRepository withdrawalRepo;

	@Override
	public List<Withdrawal> listAllWithdrawalsByBankId(int bid) {
		return withdrawalRepo.findByBankAccountId(bid);
	}

	@Override
	public Withdrawal showWithdrawal(int withdrawalId, int bankAcctId) {
		Optional<Withdrawal> op = withdrawalRepo.findById(withdrawalId);
		Withdrawal with = null;
		if (op.isPresent()) {
			with = op.get();
		}
		return with;
	}

	@Override
	public Withdrawal createWithdrawal(Withdrawal withdrawal) {
		withdrawal = withdrawalRepo.saveAndFlush(withdrawal);
		return withdrawal;
	}

	@Override
	public Withdrawal updateWithdrawal(int withdrawalId, Withdrawal withdrawal) {
		Withdrawal dbWithdrawal = showWithdrawal(withdrawalId, withdrawal.getBankAccount().getId());
		if (withdrawal.getDescription() != null) {
			dbWithdrawal.setDescription(withdrawal.getDescription());
		}
		return dbWithdrawal;
	}

	@Override
	public boolean deleteWithdrawal(int withdrawalId) {
		withdrawalRepo.deleteById(withdrawalId);
		if (withdrawalRepo.findById(withdrawalId) != null) {
			return false;
		} else {
			return true;
		}
	}
	
}
