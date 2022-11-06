package com.skilldistillery.finance.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.CreditCard;
import com.skilldistillery.finance.repositories.CreditCardRepository;

@Service
public class CreditCardServiceImpl implements CreditCardService {
	
	@Autowired
	private CreditCardRepository creditCardRepo;

	@Override
	public List<CreditCard> listAllCreditCards() {
		return creditCardRepo.findAll();
	}

	@Override
	public CreditCard showCreditCard(int creditCardId) {
		Optional<CreditCard> op = creditCardRepo.findById(creditCardId);
		CreditCard cc = null;
		if (op.isPresent()) {
			cc = op.get();
		}
		return cc;
	}

	@Override
	public CreditCard createCreditCard(CreditCard creditCard) {
		creditCard = creditCardRepo.saveAndFlush(creditCard);
		return creditCard;
	}

	@Override
	public CreditCard updateCreditCard(int creditCardId, CreditCard creditCard) {
		CreditCard dbCard = showCreditCard(creditCardId);
		if (creditCard.getInstitutionName() != null) {
			dbCard.setInstitutionName(creditCard.getInstitutionName());
		}
		if (creditCard.getCreditLimit() != 0) {
			dbCard.setCreditLimit(creditCard.getCreditLimit());
		}
		return dbCard;
	}

	@Override
	public boolean deleteCreditCard(int creditCardId) {
		creditCardRepo.deleteById(creditCardId);
		if (creditCardRepo.findById(creditCardId) != null) {
			return false;
		} else {
			return true;
		}
	}
	
}
