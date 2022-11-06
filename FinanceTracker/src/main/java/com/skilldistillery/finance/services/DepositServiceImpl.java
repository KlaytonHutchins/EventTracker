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
	public List<Deposit> listAllDeposits() {
		return depositRepo.findAll();
	}

	@Override
	public Deposit showDeposit(int depositId) {
		Optional<Deposit> op = depositRepo.findById(depositId);
		Deposit dep = null;
		if (op.isPresent()) {
			dep = op.get();
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
		Deposit dbDeposit = showDeposit(depositId);
		if (deposit.getDescription() != null) {
			dbDeposit.setDescription(deposit.getDescription());
		}
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
