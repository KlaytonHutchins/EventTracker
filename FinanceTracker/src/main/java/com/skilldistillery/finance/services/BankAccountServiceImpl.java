package com.skilldistillery.finance.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.BankAccount;
import com.skilldistillery.finance.entities.Deposit;
import com.skilldistillery.finance.entities.Withdrawal;
import com.skilldistillery.finance.repositories.BankAccountRepository;
import com.skilldistillery.finance.repositories.DepositRepository;
import com.skilldistillery.finance.repositories.WithdrawalRepository;

@Service
public class BankAccountServiceImpl implements BankAccountService {
	
	@Autowired
	private BankAccountRepository bankAccountRepo;
	@Autowired
	private WithdrawalRepository withRepo;
	@Autowired
	private DepositRepository depRepo;

	@Override
	public List<BankAccount> listAllBankAccounts() {
		return bankAccountRepo.findAll();
	}

	@Override
	public BankAccount showBankAccount(int bankAccountId) {
		Optional<BankAccount> op = bankAccountRepo.findById(bankAccountId);
		BankAccount bank = null;
		if (op.isPresent()) {
			bank = op.get();
		}
		return bank;
	}

	@Override
	public BankAccount createBankAccount(BankAccount bankAccount) {
		bankAccount = bankAccountRepo.saveAndFlush(bankAccount);
		return bankAccount;
	}

	@Override
	public BankAccount updateBankAccount(int bankAccountId, BankAccount bankAccount) {
		BankAccount dbBank = showBankAccount(bankAccountId);
		if (bankAccount.getInstitutionName() != null) {
			dbBank.setInstitutionName(bankAccount.getInstitutionName());
		}
		bankAccountRepo.saveAndFlush(dbBank);
		return dbBank;
	}

	@Override
	public boolean deleteBankAccount(int bankAccountId) {
		List<Withdrawal> withdrawals = withRepo.findByBankAccountId(bankAccountId);
		for (Withdrawal withdrawal : withdrawals) {
			withRepo.delete(withdrawal);
		}
		List<Deposit> deposits = depRepo.findByBankAccountId(bankAccountId);
		for (Deposit deposit : deposits) {
			depRepo.delete(deposit);
		}
		bankAccountRepo.deleteById(bankAccountId);
		if (bankAccountRepo.findById(bankAccountId) != null) {
			return false;
		} else {
			return true;
		}
	}
	
}
