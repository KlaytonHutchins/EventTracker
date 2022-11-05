package com.skilldistillery.finance.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "credit_card")
public class CreditCard {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "institution_name")
	private String institutionName;
	
	@Formula("(SELECT (SELECT SUM(pay.amount) FROM Payment pay WHERE pay.credit_card_id = id) - (SELECT SUM(pur.amount) FROM Purchase pur WHERE pur.credit_card_id = id))")
	private Double balance;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_portfolio_id")
	private UserPortfolio userPortfolio;
	
	@OneToMany(mappedBy = "creditCard")
	private List<Payment> payments;
	
	@OneToMany(mappedBy = "creditCard")
	private List<Purchase> purchases;

	public CreditCard() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getInstitutionName() {
		return institutionName;
	}

	public void setInstitutionName(String institutionName) {
		this.institutionName = institutionName;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public UserPortfolio getUserPortfolio() {
		return userPortfolio;
	}

	public void setUserPortfolio(UserPortfolio userPortfolio) {
		this.userPortfolio = userPortfolio;
	}

	public List<Payment> getPayments() {
		return payments;
	}

	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}

	public List<Purchase> getPurchases() {
		return purchases;
	}

	public void setPurchases(List<Purchase> purchases) {
		this.purchases = purchases;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CreditCard other = (CreditCard) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "CreditCard [id=" + id + ", institutionName=" + institutionName + ", balance=" + balance + "]";
	}
	
}
