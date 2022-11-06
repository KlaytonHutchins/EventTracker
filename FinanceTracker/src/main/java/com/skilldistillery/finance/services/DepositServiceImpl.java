package com.skilldistillery.finance.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.CreditCard;
import com.skilldistillery.finance.entities.Deposit;
import com.skilldistillery.finance.repositories.DepositRepository;

@Service
public class DepositServiceImpl implements DepositService {
	
	@Autowired
	private DepositRepository depositRepo;

	@Override
	public List<Deposit> listAllDepositsByBankId(int bid) {
		return depositRepo.findByBankAccountId(bid);
	}

	@Override
	public Deposit showDeposit(int depositId, int bankAcctId) {
		Optional<Deposit> op = depositRepo.findById(depositId);
		Deposit dep = null;
		if (op.isPresent()) {
			dep = op.get();
			if (dep.getBankAccount().getId() != bankAcctId) {
				return null;
			}
		}
		return dep;
	}

	@Override
	public Deposit createDeposit(Deposit deposit) {
		deposit = depositRepo.saveAndFlush(deposit);
		return deposit;
	}

	@Override
	public Deposit updateDeposit(int depositId, Deposit deposit) {
		Deposit dbDeposit = showDeposit(depositId, deposit.getBankAccount().getId());
		if (deposit.getDescription() != null) {
			dbDeposit.setDescription(deposit.getDescription());
		}
		depositRepo.saveAndFlush(dbDeposit);
		return dbDeposit;
	}

	@Override
	public boolean deleteDeposit(int depositId) {
		depositRepo.deleteById(depositId);
		if (depositRepo.findById(depositId) != null) {
			return false;
		} else {
			return true;
		}
	}
	
}
