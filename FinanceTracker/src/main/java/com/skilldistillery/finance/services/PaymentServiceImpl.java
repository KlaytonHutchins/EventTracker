package com.skilldistillery.finance.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.finance.entities.Payment;
import com.skilldistillery.finance.repositories.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {
	
	@Autowired
	private PaymentRepository paymentRepo;

	@Override
	public List<Payment> listAllPaymentsByCreditCardId(int ccid) {
		return paymentRepo.findByCreditCardId(ccid);
	}

	@Override
	public Payment showPayment(int paymentId, int creditCardId) {
		Optional<Payment> op = paymentRepo.findById(paymentId);
		Payment pay = null;
		if (op.isPresent()) {
			pay = op.get();
		}
		return pay;
	}

	@Override
	public Payment createPayment(Payment payment) {
		payment = paymentRepo.saveAndFlush(payment);
		return payment;
	}

	@Override
	public Payment updatePayment(int paymentId, Payment payment) {
		Payment dbPayment = showPayment(paymentId, payment.getCreditCard().getId());
		if (payment.getDescription() != null) {
			dbPayment.setDescription(payment.getDescription());
			dbPayment.setAmount(payment.getAmount());
		}
		paymentRepo.saveAndFlush(dbPayment);
		return dbPayment;
	}

	@Override
	public boolean deletePayment(int paymentId) {
		paymentRepo.deleteById(paymentId);
		if (paymentRepo.findById(paymentId) != null) {
			return false;
		} else {
			return true;
		}
	}
	
}
