package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Purchase;

public interface PurchaseService {
	
	List<Purchase> listAllPurchases();
	Purchase showPurchase(int purchaseId);
	Purchase createPurchase(Purchase purchase);
	Purchase updatePurchase(int purchaseId, Purchase purchase);
	boolean deletePurchase(int purchaseId);
	
}
