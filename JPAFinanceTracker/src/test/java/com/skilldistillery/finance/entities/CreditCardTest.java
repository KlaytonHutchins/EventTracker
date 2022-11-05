package com.skilldistillery.finance.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CreditCardTest {
	
	private static EntityManagerFactory emf;
	EntityManager em;
	CreditCard creditCard;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAFinanceTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		creditCard = em.find(CreditCard.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		creditCard = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(creditCard);
		assertNotNull(creditCard.getInstitutionName());
		assertEquals("Capital One", creditCard.getInstitutionName());
	}
	
	@Test
	void test_balance_formula() {
		assertNotNull(creditCard);
		assertNotNull(creditCard.getBalance());
		assertEquals(33.67, creditCard.getBalance());
	}

}
