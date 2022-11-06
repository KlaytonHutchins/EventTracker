package com.skilldistillery.finance.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Purchase;
import com.skilldistillery.finance.repositories.PurchaseRepository;

@Service
public class PurchaseServiceImpl implements PurchaseService {
	
	@Autowired
	private PurchaseRepository purchaseRepo;

	@Override
	public List<Purchase> listAllPurchases() {
		return purchaseRepo.findAll();
	}

	@Override
	public Purchase showPurchase(int purchaseId) {
		Optional<Purchase> op = purchaseRepo.findById(purchaseId);
		Purchase pur = null;
		if (op.isPresent()) {
			pur = op.get();
		}
		return pur;
	}

	@Override
	public Purchase createPurchase(Purchase purchase) {
		purchase = purchaseRepo.saveAndFlush(purchase);
		return purchase;
	}

	@Override
	public Purchase updatePurchase(int purchaseId, Purchase purchase) {
		Purchase dbPurchase = showPurchase(purchaseId);
		if (purchase.getDescription() != null) {
			dbPurchase.setDescription(purchase.getDescription());
		}
		return dbPurchase;
	}

	@Override
	public boolean deletePurchase(int purchaseId) {
		purchaseRepo.deleteById(purchaseId);
		if (purchaseRepo.findById(purchaseId) != null) {
			return false;
		} else {
			return true;
		}
	}
	
}
