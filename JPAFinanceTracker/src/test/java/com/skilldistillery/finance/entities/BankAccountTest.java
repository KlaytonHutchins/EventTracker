package com.skilldistillery.finance.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BankAccountTest {
	
	private static EntityManagerFactory emf;
	EntityManager em;
	BankAccount bankAcct;

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
		bankAcct = em.find(BankAccount.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		bankAcct = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(bankAcct);
		assertNotNull(bankAcct.getInstitutionName());
		assertEquals("", bankAcct.getInstitutionName());
	}

}
