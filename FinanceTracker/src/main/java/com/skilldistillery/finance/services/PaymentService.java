package com.skilldistillery.finance.services;

import java.util.List;

import com.skilldistillery.finance.entities.Payment;

public interface PaymentService {
	
	List<Payment> listAllPayments();
	Payment showPayment(int paymentId);
	Payment createPayment(Payment payment);
	Payment updatePayment(int paymentId, Payment payment);
	boolean deletePayment(int paymentId);
	
}
