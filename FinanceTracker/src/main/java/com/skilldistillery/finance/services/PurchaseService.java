package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Purchase;

public interface PurchaseService {
	
	List<Purchase> listAllPurchasesByCreditCardId(int ccid);
	Purchase showPurchase(int purchaseId, int creditCardId);
	Purchase createPurchase(Purchase purchase);
	Purchase updatePurchase(int purchaseId, Purchase purchase);
	boolean deletePurchase(int purchaseId);
	
}
