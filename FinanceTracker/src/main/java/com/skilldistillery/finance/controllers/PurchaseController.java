package com.skilldistillery.finance.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.CreditCard;
import com.skilldistillery.finance.entities.Purchase;
import com.skilldistillery.finance.services.PurchaseService;

@RestController
@RequestMapping("api/portfolios/{pid}")
public class PurchaseController {
	
	@Autowired
	private PurchaseService purchaseSvc;
	
	@GetMapping("creditCards/{ccid}/purchases")
	public List<Purchase> listPurchases(@PathVariable Integer ccid) {
		return purchaseSvc.listAllPurchasesByCreditCardId(ccid);
	}
	
	@GetMapping("creditCards/{ccid}/purchases/{purId}")
	public Purchase showPurchase(@PathVariable Integer ccid, @PathVariable Integer purId) {
		return purchaseSvc.showPurchase(purId, ccid);
	}
	
	@PostMapping("creditCards/{ccid}/purchases")
	public Purchase createPurchase(@PathVariable Integer ccid, @RequestBody Purchase purchase, HttpServletResponse resp, HttpServletRequest req) {
		CreditCard cc = new CreditCard();
		cc.setId(ccid);
		purchase.setCreditCard(cc);
		purchase = purchaseSvc.createPurchase(purchase);
		resp.setStatus(201);
		StringBuffer urlSb = req.getRequestURL();
		urlSb.append("/").append(purchase.getId());
		String url = urlSb.toString();
		resp.setHeader("Location", url);
		return purchase;
	}
	
	@PutMapping("creditCards/{ccid}/purchases/{purId}")
	public Purchase updatePurchase(@PathVariable Integer ccid, @PathVariable Integer purId, @RequestBody Purchase purchase, HttpServletResponse resp) {
		if (purchaseSvc.showPurchase(purId, ccid) == null) {
			resp.setStatus(404);
			return null;
		}
		CreditCard cc = new CreditCard();
		cc.setId(ccid);
		purchase.setCreditCard(cc);
		purchase = purchaseSvc.updatePurchase(purId, purchase);
		return purchase;
	}
	
	@DeleteMapping("creditCards/{ccid}/purchases/{purId}")
	public void deletePurchase(@PathVariable Integer ccid, @PathVariable Integer purId, HttpServletResponse resp) {
		if (purchaseSvc.showPurchase(purId, ccid) == null) {
			resp.setStatus(404);
			return;
		}
		boolean deleted = purchaseSvc.deletePurchase(purId);
		if (!deleted) {
			resp.setStatus(404);
		}
		resp.setStatus(204);
	}
	
}
