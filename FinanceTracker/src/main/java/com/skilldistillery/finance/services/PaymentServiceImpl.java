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
	public List<Payment> listAllPayments() {
		return paymentRepo.findAll();
	}

	@Override
	public Payment showPayment(int paymentId) {
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
		Payment dbPayment = showPayment(paymentId);
		if (payment.getDescription() != null) {
			dbPayment.setDescription(payment.getDescription());
		}
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
