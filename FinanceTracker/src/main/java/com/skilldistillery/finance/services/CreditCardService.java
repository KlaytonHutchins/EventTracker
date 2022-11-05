package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.CreditCard;

public interface CreditCardService {
	
	List<CreditCard> listAllCreditCards();
	CreditCard showCreditCard(int creditCardId);
	CreditCard createCreditCard(CreditCard creditCard);
	CreditCard updateCreditCard(int creditCardId, CreditCard creditCard);
	boolean deleteCreditCard(int creditCardId);
	
}
