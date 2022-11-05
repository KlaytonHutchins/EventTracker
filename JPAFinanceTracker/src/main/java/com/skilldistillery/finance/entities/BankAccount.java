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
@Table(name = "bank_account")
public class BankAccount {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "institution_name")
	private String institutionName;
	
	@Formula("(SELECT (SELECT SUM(dep.amount) FROM Deposit dep WHERE dep.account_id = id) - (SELECT SUM(withd.amount) FROM Withdrawal withd WHERE withd.account_id = id))")
	private Double balance;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_portfolio_id")
	private UserPortfolio userPortfolio;
	
	@OneToMany(mappedBy = "bankAccount")
	private List<Withdrawal> withdrawals;
	
	@OneToMany(mappedBy = "bankAccount")
	private List<Deposit> deposits;

	public BankAccount() {}

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

	public List<Withdrawal> getWithdrawals() {
		return withdrawals;
	}

	public void setWithdrawals(List<Withdrawal> withdrawals) {
		this.withdrawals = withdrawals;
	}

	public List<Deposit> getDeposits() {
		return deposits;
	}

	public void setDeposits(List<Deposit> deposits) {
		this.deposits = deposits;
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
		BankAccount other = (BankAccount) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "BankAccount [id=" + id + ", institutionName=" + institutionName + ", balance=" + balance + "]";
	}
	
}
