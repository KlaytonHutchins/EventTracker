package com.skilldistillery.finance.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.finance.entities.BankAccount;
import com.skilldistillery.finance.entities.CreditCard;
import com.skilldistillery.finance.entities.Payment;
import com.skilldistillery.finance.entities.Withdrawal;
import com.skilldistillery.finance.services.PaymentService;

@RestController
@RequestMapping("api/portfolios/{pid}")
@CrossOrigin({"*", "http://localhost/"})
public class PaymentController {
	
	@Autowired
	private PaymentService paymentSvc;
	
	@GetMapping("creditCards/{ccid}/payments")
	public List<Payment> listPayments(@PathVariable Integer ccid) {
		return paymentSvc.listAllPaymentsByCreditCardId(ccid);
	}
	
	@GetMapping("creditCards/{ccid}/payments/{payId}")
	public Payment showPayment(@PathVariable Integer ccid, @PathVariable Integer payId, HttpServletResponse resp) {
		Payment payment = paymentSvc.showPayment(payId, ccid);
		if (payment == null) {
			resp.setStatus(404);
		}
		return payment;
	}
	
	@PostMapping("creditCards/{ccid}/payments")
	public Payment createPayment(@PathVariable Integer ccid, @RequestBody Payment payment, HttpServletResponse resp, HttpServletRequest req) {
		CreditCard cc = new CreditCard();
		cc.setId(ccid);
		payment.setCreditCard(cc);
		payment = paymentSvc.createPayment(payment);
		resp.setStatus(201);
		StringBuffer urlSb = req.getRequestURL();
		urlSb.append("/").append(payment.getId());
		String url = urlSb.toString();
		resp.setHeader("Location", url);
		return payment;
	}
	
	@PutMapping("creditCards/{ccid}/payments/{payId}")
	public Payment updatePayment(@PathVariable Integer ccid, @PathVariable Integer payId, @RequestBody Payment payment, HttpServletResponse resp) {
		if (paymentSvc.showPayment(payId, ccid) == null) {
			resp.setStatus(404);
			return null;
		}
		CreditCard cc = new CreditCard();
		cc.setId(ccid);
		payment.setCreditCard(cc);
		payment = paymentSvc.updatePayment(payId, payment);
		return payment;
	}
	
	@DeleteMapping("creditCards/{ccid}/payments/{payId}")
	public void deletePayment(@PathVariable Integer ccid, @PathVariable Integer payId, HttpServletResponse resp) {
		if (paymentSvc.showPayment(payId, ccid) == null) {
			resp.setStatus(404);
			return;
		}
		boolean deleted = paymentSvc.deletePayment(payId);
		if (!deleted) {
			resp.setStatus(404);
		}
		resp.setStatus(204);
	}
	
}
