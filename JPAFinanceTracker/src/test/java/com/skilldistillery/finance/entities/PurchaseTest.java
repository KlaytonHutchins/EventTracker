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

class PurchaseTest {
	
	private static EntityManagerFactory emf;
	EntityManager em;
	Purchase purchase;

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
		purchase = em.find(Purchase.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		purchase = null;
	}

	@Test
	void test_basic_mapping() {
		assertNotNull(purchase);
		assertNotNull(purchase.getDescription());
		assertEquals("", purchase.getDescription());
	}

}
