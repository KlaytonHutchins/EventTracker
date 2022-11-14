window.addEventListener('load', function() {
	init();
});

function init() {
	document.getElementById('detailDiv').style.display = 'none';
	document.getElementById('detailHeader').style.display = 'none';
	loadBankAccountList();
	loadCreditCardList();
	document.getElementsByName('newBankAcct')[0].addBankAcct.addEventListener('click', function(event) {
		event.preventDefault();
		let bankAcct = {institutionName: document.getElementsByName('newBankAcct')[0].bankAcct.value}
		if (bankAcct.institutionName !== '') {
			document.getElementsByName('newBankAcct')[0].bankAcct.value = '';
			createBankAcct(bankAcct);
		}
	})
	document.getElementsByName('newCreditCard')[0].addCreditCard.addEventListener('click', function(event) {
		event.preventDefault();
		let creditCard = {
			institutionName: document.getElementsByName('newCreditCard')[0].creditCard.value,
			creditLimit: document.getElementsByName('newCreditCard')[0].creditLimit.value
			}
		if (creditCard.institutionName !== '' && creditCard.creditLimit !== '' && !isNaN(creditCard.creditLimit)) {
			document.getElementsByName('newCreditCard')[0].creditCard.value = '';
			document.getElementsByName('newCreditCard')[0].creditLimit.value = '';
			createCreditCard(creditCard);
		}
	})
	document.getElementsByName('back')[0].backButton.addEventListener('click', function(event) {
		event.preventDefault();
		init();
	})
};

function loadBankAccountList() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/portfolios/1/bankAccounts', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let bankAccts = JSON.parse(xhr.responseText);
				displayBankAccts(bankAccts);
				displayError('');
			} else if (xhr.status === 404) {
				displayError('Bank Accounts Not Found');
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
};

function loadCreditCardList() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/portfolios/1/creditCards', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let creditCards = JSON.parse(xhr.responseText);
				displaycreditCards(creditCards);
				displayError('');
			} else if (xhr.status === 404) {
				displayError('Credit Cards Not Found');
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
};

function loadDeposits(bankAcctId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/portfolios/1/bankAccounts/'+bankAcctId+'/deposits', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let deposits = JSON.parse(xhr.responseText);
				displayDeposits(bankAcctId, deposits);
				displayError('');
			} else if (xhr.status === 404) {
				displayError('Deposits Not Found');
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
};

function loadWithdrawals(bankAcctId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/portfolios/1/bankAccounts/'+bankAcctId+'/withdrawals', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let withdrawals = JSON.parse(xhr.responseText);
				displayWithdrawals(bankAcctId, withdrawals);
				displayError('');
			} else if (xhr.status === 404) {
				displayError('Withdrawals Not Found');
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
};

function loadPayments(creditCardId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/portfolios/1/creditCards/'+creditCardId+'/payments', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let payments = JSON.parse(xhr.responseText);
				displayPayments(creditCardId, payments);
				displayError('');
			} else if (xhr.status === 404) {
				displayError('Payments Not Found');
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
};

function loadPurchases(creditCardId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/portfolios/1/creditCards/'+creditCardId+'/purchases', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let purchases = JSON.parse(xhr.responseText);
				displayPurchases(creditCardId, purchases);
				displayError('');
			} else if (xhr.status === 404) {
				displayError('Purchases Not Found');
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
};

function displayError(msg) {
	let errorDiv = document.getElementById('error');
	errorDiv.textContent = '';
	errorDiv.textContent = msg;
};

function displayBankAccts(bankAccts) {
	document.getElementById('bankAcctDiv').style.display = 'block';
	let bankAcctsBody = document.getElementById('bankAcctsBody');
	bankAcctsBody.textContent = '';
	if (bankAccts && Array.isArray(bankAccts) && bankAccts.length > 0) {
		for (let bankAcct of bankAccts) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.textContent = bankAcct.institutionName;
			tr.appendChild(td);
			td = document.createElement('td');
			if (bankAcct.balance !== null) {
				td.textContent = bankAcct.balance.toFixed(2);
			} else {
				td.textContent = 0;
			}
			tr.appendChild(td);
			
			td = document.createElement('td');
			let deleteForm = document.createElement('form');
			td.appendChild(deleteForm);
			let deleteButton = document.createElement('button');
			deleteButton.setAttribute('class', 'btn btn-secondary');
			deleteButton.textContent = 'Delete';
//			let image = document.createElement('svg');
//			image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//			image.setAttribute('width', '16');
//			image.setAttribute('height', '16');
//			image.setAttribute('fill', 'currentColor');
//			image.setAttribute('class', 'bi bi-trash3');
//			image.setAttribute('viewBox', '0 0 16 16');
//			let path = document.createElement('path');
//			path.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');
//			image.appendChild(path);
//			deleteButton.appendChild(image);
			deleteForm.appendChild(deleteButton);
			tr.appendChild(td);
			deleteButton.addEventListener('click', function(event) {
				event.preventDefault();
				let confirmation = confirm("Are you sure?");
				if (confirmation) {
					deleteBankAcct(bankAcct.id);
				}
			})
			
			bankAcctsBody.appendChild(tr);
			tr.addEventListener('click', function(event) {
				event.preventDefault();
				let detailHeader = document.getElementById('detailH2');
				detailHeader.textContent = 'Bank Account - '+bankAcct.institutionName+'('+bankAcct.id+')';
				loadDeposits(bankAcct.id);
				loadWithdrawals(bankAcct.id);
			});
		}
	}
};

function displaycreditCards(creditCards) {
	document.getElementById('creditCardDiv').style.display = 'block';
	let creditCardsBody = document.getElementById('creditCardsBody');
	creditCardsBody.textContent = '';
	if (creditCards && Array.isArray(creditCards) && creditCards.length > 0) {
		for (let creditCard of creditCards) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.textContent = creditCard.institutionName;
			tr.appendChild(td);
			td = document.createElement('td');
			if (creditCard.balance !== null) {
				td.textContent = creditCard.balance.toFixed(2);
			} else {
				td.textContent = 0;
			}
			tr.appendChild(td);
			td = document.createElement('td');
			td.textContent = creditCard.creditLimit;
			tr.appendChild(td);
			
			td = document.createElement('td');
			let deleteForm = document.createElement('form');
			td.appendChild(deleteForm);
			let deleteButton = document.createElement('button');
			deleteButton.setAttribute('class', 'btn btn-secondary');
			deleteButton.textContent = 'Delete';
//			let image = document.createElement('svg');
//			image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//			image.setAttribute('width', '16');
//			image.setAttribute('height', '16');
//			image.setAttribute('fill', 'currentColor');
//			image.setAttribute('class', 'bi bi-trash3');
//			image.setAttribute('viewBox', '0 0 16 16');
//			let path = document.createElement('path');
//			path.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');
//			image.appendChild(path);
//			deleteButton.appendChild(image);
			deleteForm.appendChild(deleteButton);
			tr.appendChild(td);
			deleteButton.addEventListener('click', function(event) {
				event.preventDefault();
				let confirmation = confirm("Are you sure?");
				if (confirmation) {
					deleteCreditCard(creditCard.id);
				}
			})
			
			creditCardsBody.appendChild(tr);
			tr.addEventListener('click', function(event) {
				event.preventDefault();
				let detailHeader = document.getElementById('detailH2');
				detailHeader.textContent = 'Credit Card - '+creditCard.institutionName+'('+creditCard.id+') (Limit: '+creditCard.creditLimit+')';
				loadPayments(creditCard.id);
				loadPurchases(creditCard.id);
			});
		}
	}
};

function displayDeposits(bankAcctId, deposits) {
	document.getElementById('bankAcctDiv').style.display = 'none';
	document.getElementById('creditCardDiv').style.display = 'none';
	document.getElementsByName('paymentButton')[0].style.display = 'none';
	document.getElementsByName('depositButton')[0].style.display = 'flex';
	document.getElementById('detailDiv').style.display = 'flex';
	document.getElementById('detailHeader').style.display = 'flex';
	let depositPaymentHeader = document.getElementById('depositPaymentHeader');
	depositPaymentHeader.textContent = 'Deposits';
	let depositPaymentButton = document.getElementsByName('depositButton')[0];
	depositPaymentButton.textContent = 'Add Deposit';
	depositPaymentButton.addEventListener('click', function(event) {
		event.preventDefault();
		let deposit = {
			amount: document.getElementsByName('depositPaymentAmount')[0].value,
			description: document.getElementsByName('depositPaymentDescription')[0].value
		}
		if (!isNaN(deposit.amount) && deposit.amount !== '' && deposit.description !== '') {
			document.getElementsByName('depositPaymentAmount')[0].value = '';
			document.getElementsByName('depositPaymentDescription')[0].value = '';
			createDeposit(bankAcctId, deposit);
		}
	});
	let depositBody = document.getElementById('depositPaymentBody');
	depositBody.textContent = '';
	if (deposits && Array.isArray(deposits) && deposits.length > 0) {
		for (let deposit of deposits) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			
			td.textContent = deposit.amount.toFixed(2);
			tr.appendChild(td);
			
			td = document.createElement('td');
			let timestamp = deposit.timestamp.substring(5,10)+'-'+deposit.timestamp.substring(0,4)+' @ '+deposit.timestamp.substring(11,16);
			td.textContent = timestamp;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = deposit.description;
			tr.appendChild(td);
			
			td = document.createElement('td');
			let deleteForm = document.createElement('form');
			td.appendChild(deleteForm);
			let deleteButton = document.createElement('button');
			deleteButton.setAttribute('class', 'btn btn-secondary');
			deleteButton.textContent = 'Delete';
//			let image = document.createElement('svg');
//			image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//			image.setAttribute('width', '16');
//			image.setAttribute('height', '16');
//			image.setAttribute('fill', 'currentColor');
//			image.setAttribute('class', 'bi bi-trash3');
//			image.setAttribute('viewBox', '0 0 16 16');
//			let path = document.createElement('path');
//			path.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');
//			image.appendChild(path);
//			deleteButton.appendChild(image);
			deleteForm.appendChild(deleteButton);
			tr.appendChild(td);
			deleteButton.addEventListener('click', function(event) {
				event.preventDefault();
				deleteDPPW('deposits', bankAcctId, deposit.id);
			})
			
			depositBody.appendChild(tr);
		}
	}
};

function displayWithdrawals(bankAcctId, withdrawals) {
	document.getElementById('bankAcctDiv').style.display = 'none';
	document.getElementById('creditCardDiv').style.display = 'none';
	document.getElementsByName('purchaseButton')[0].style.display = 'none';
	document.getElementsByName('withdrawalButton')[0].style.display = 'flex';
	document.getElementById('detailDiv').style.display = 'flex';
	document.getElementById('detailHeader').style.display = 'flex';
	let withdrawalPurchaseHeader = document.getElementById('withdrawalPurchaseHeader');
	withdrawalPurchaseHeader.textContent = 'Withdrawals';
	let withdrawalPurchaseButton = document.getElementsByName('withdrawalButton')[0];
	withdrawalPurchaseButton.textContent = 'Add Withdrawal';
	withdrawalPurchaseButton.addEventListener('click', function(event) {
		event.preventDefault();
		let withdrawal = {
			amount: document.getElementsByName('withdrawalPurchaseAmount')[0].value,
			description: document.getElementsByName('withdrawalPurchaseDescription')[0].value
		}
		if (!isNaN(withdrawal.amount) && withdrawal.amount !== '' && withdrawal.description !== '') {
			document.getElementsByName('withdrawalPurchaseAmount')[0].value = '';
			document.getElementsByName('withdrawalPurchaseDescription')[0].value = '';
			createWithdrawal(bankAcctId, withdrawal);
		}
	});
	let withdrawalBody = document.getElementById('withdrawalPurchaseBody');
	withdrawalBody.textContent = '';
	if (withdrawals && Array.isArray(withdrawals) && withdrawals.length > 0) {
		for (let withdrawal of withdrawals) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			
			td.textContent = withdrawal.amount.toFixed(2);
			tr.appendChild(td);
			
			td = document.createElement('td');
			let timestamp = withdrawal.timestamp.substring(5,10)+'-'+withdrawal.timestamp.substring(0,4)+' @ '+withdrawal.timestamp.substring(11,16);
			td.textContent = timestamp;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = withdrawal.description;
			tr.appendChild(td);
			
			td = document.createElement('td');
			let deleteForm = document.createElement('form');
			td.appendChild(deleteForm);
			let deleteButton = document.createElement('button');
			deleteButton.setAttribute('class', 'btn btn-secondary');
			deleteButton.textContent = 'Delete';
//			let image = document.createElement('svg');
//			image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//			image.setAttribute('width', '16');
//			image.setAttribute('height', '16');
//			image.setAttribute('fill', 'currentColor');
//			image.setAttribute('class', 'bi bi-trash3');
//			image.setAttribute('viewBox', '0 0 16 16');
//			let path = document.createElement('path');
//			path.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');
//			image.appendChild(path);
//			deleteButton.appendChild(image);
			deleteForm.appendChild(deleteButton);
			tr.appendChild(td);
			deleteButton.addEventListener('click', function(event) {
				event.preventDefault();
				deleteDPPW('withdrawals', bankAcctId, withdrawal.id);
			})
			
			withdrawalBody.appendChild(tr);
		}
	}
};

function displayPayments(creditCardId, payments) {
	document.getElementById('bankAcctDiv').style.display = 'none';
	document.getElementById('creditCardDiv').style.display = 'none';
	document.getElementsByName('depositButton')[0].style.display = 'none';
	document.getElementsByName('paymentButton')[0].style.display = 'flex';
	document.getElementById('detailDiv').style.display = 'flex';
	document.getElementById('detailHeader').style.display = 'flex';
	let depositPaymentHeader = document.getElementById('depositPaymentHeader');
	depositPaymentHeader.textContent = 'Payments';
	let depositPaymentButton = document.getElementsByName('paymentButton')[0];
	depositPaymentButton.textContent = 'Add Payment';
	depositPaymentButton.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('in new function');
		let payment = {
			amount: document.getElementsByName('depositPaymentAmount')[0].value,
			description: document.getElementsByName('depositPaymentDescription')[0].value
		}
		if (!isNaN(payment.amount) && payment.amount !== '' && payment.description !== '') {
			document.getElementsByName('depositPaymentAmount')[0].value = '';
			document.getElementsByName('depositPaymentDescription')[0].value = '';
			createPayment(creditCardId, payment);
		}
	});
	let paymentBody = document.getElementById('depositPaymentBody');
	paymentBody.textContent = '';
	if (payments && Array.isArray(payments) && payments.length > 0) {
		for (let payment of payments) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			
			td.textContent = payment.amount.toFixed(2);
			tr.appendChild(td);
			
			td = document.createElement('td');
			let timestamp = payment.timestamp.substring(5,10)+'-'+payment.timestamp.substring(0,4)+' @ '+payment.timestamp.substring(11,16);
			td.textContent = timestamp;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = payment.description;
			tr.appendChild(td);
			
			td = document.createElement('td');
			let deleteForm = document.createElement('form');
			td.appendChild(deleteForm);
			let deleteButton = document.createElement('button');
			deleteButton.setAttribute('class', 'btn btn-secondary');
			deleteButton.textContent = 'Delete';
//			let image = document.createElement('svg');
//			image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//			image.setAttribute('width', '16');
//			image.setAttribute('height', '16');
//			image.setAttribute('fill', 'currentColor');
//			image.setAttribute('class', 'bi bi-trash3');
//			image.setAttribute('viewBox', '0 0 16 16');
//			let path = document.createElement('path');
//			path.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');
//			image.appendChild(path);
//			deleteButton.appendChild(image);
			deleteForm.appendChild(deleteButton);
			tr.appendChild(td);
			deleteButton.addEventListener('click', function(event) {
				event.preventDefault();
				deleteDPPW('payments', creditCardId, payment.id);
			})
			
			paymentBody.appendChild(tr);
		}
	}
};

function displayPurchases(creditCardId, purchases) {
	document.getElementById('bankAcctDiv').style.display = 'none';
	document.getElementById('creditCardDiv').style.display = 'none';
	document.getElementsByName('withdrawalButton')[0].style.display = 'none';
	document.getElementsByName('purchaseButton')[0].style.display = 'flex';
	document.getElementById('detailDiv').style.display = 'flex';
	document.getElementById('detailHeader').style.display = 'flex';
	let withdrawalPurchaseHeader = document.getElementById('withdrawalPurchaseHeader');
	withdrawalPurchaseHeader.textContent = 'Purchases';
	let withdrawalPurchaseButton = document.getElementsByName('purchaseButton')[0];
	withdrawalPurchaseButton.textContent = 'Add Purchase';
	withdrawalPurchaseButton.addEventListener('click', function(event) {
		event.preventDefault();
		let purchase = {
			amount: document.getElementsByName('withdrawalPurchaseAmount')[0].value,
			description: document.getElementsByName('withdrawalPurchaseDescription')[0].value
		}
		if (!isNaN(purchase.amount) && purchase.amount !== '' && purchase.description !== '') {
			document.getElementsByName('withdrawalPurchaseAmount')[0].value = '';
			document.getElementsByName('withdrawalPurchaseDescription')[0].value = '';
			createPurchase(creditCardId, purchase);
		}
	});
	let purchaseBody = document.getElementById('withdrawalPurchaseBody');
	purchaseBody.textContent = '';
	if (purchases && Array.isArray(purchases) && purchases.length > 0) {
		for (let purchase of purchases) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			
			td.textContent = purchase.amount.toFixed(2);
			tr.appendChild(td);
			
			td = document.createElement('td');
			let timestamp = purchase.timestamp.substring(5,10)+'-'+purchase.timestamp.substring(0,4)+' @ '+purchase.timestamp.substring(11,16);
			td.textContent = timestamp;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = purchase.description;
			tr.appendChild(td);
			
			td = document.createElement('td');
			let deleteForm = document.createElement('form');
			td.appendChild(deleteForm);
			let deleteButton = document.createElement('button');
			deleteButton.setAttribute('class', 'btn btn-secondary');
			deleteButton.textContent = 'Delete';
//			let image = document.createElement('svg');
//			image.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//			image.setAttribute('width', '16');
//			image.setAttribute('height', '16');
//			image.setAttribute('fill', 'currentColor');
//			image.setAttribute('class', 'bi bi-trash3');
//			image.setAttribute('viewBox', '0 0 16 16');
//			let path = document.createElement('path');
//			path.setAttribute('d', 'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z');
//			image.appendChild(path);
//			deleteButton.appendChild(image);
			deleteForm.appendChild(deleteButton);
			tr.appendChild(td);
			deleteButton.addEventListener('click', function(event) {
				event.preventDefault();
				deleteDPPW('purchases', creditCardId, purchase.id);
			})
			
			purchaseBody.appendChild(tr);
		}
	}
};

function createBankAcct(bankAcct) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/portfolios/1/bankAccounts', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				let newBankAcct = JSON.parse(xhr.responseText);
				let detailHeader = document.getElementById('detailH2');
				detailHeader.textContent = 'Bank Account - '+newBankAcct.institutionName+'('+newBankAcct.id+')';
				loadDeposits(newBankAcct.id);
				loadWithdrawals(newBankAcct.id);
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(bankAcct));
};

function createDeposit(bankAcctId, deposit) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/portfolios/1/bankAccounts/'+bankAcctId+'/deposits', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				deposit = JSON.parse(xhr.responseText);
				loadDeposits(bankAcctId);
				loadWithdrawals(bankAcctId);
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(deposit));
};

function createWithdrawal(bankAcctId, withdrawal) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/portfolios/1/bankAccounts/'+bankAcctId+'/withdrawals', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				withdrawal = JSON.parse(xhr.responseText);
				loadDeposits(bankAcctId);
				loadWithdrawals(bankAcctId);
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(withdrawal));
};

function createCreditCard(creditCard) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/portfolios/1/creditCards', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				let newCreditCard = JSON.parse(xhr.responseText);
				let detailHeader = document.getElementById('detailH2');
				detailHeader.textContent = 'Credit Card - '+newCreditCard.institutionName+'('+newCreditCard.id+') (Limit: '+newCreditCard.creditLimit+')';
				loadPayments(newCreditCard.id);
				loadPurchases(newCreditCard.id);
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(creditCard));
};

function createPayment(creditCardId, payment) {
	let xhr = new XMLHttpRequest();
	console.log(creditCardId);
	xhr.open('POST', 'api/portfolios/1/creditCards/'+creditCardId+'/payments', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				payment = JSON.parse(xhr.responseText);
				loadPayments(creditCardId);
				loadPurchases(creditCardId);
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(payment));
};

function createPurchase(creditCardId, purchase) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/portfolios/1/creditCards/'+creditCardId+'/purchases', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				purchase = JSON.parse(xhr.responseText);
				loadPayments(creditCardId);
				loadPurchases(creditCardId);
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(purchase));
};

function deleteBankAcct(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/portfolios/1/bankAccounts/'+id, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				init();
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function deleteCreditCard(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/portfolios/1/creditCards/'+id, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				init();
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function deleteDPPW(type, bcid, id) {
	let xhr = new XMLHttpRequest();
	let baORcc = (type === 'withdrawals' || type === 'deposits') ? 'bankAccounts' : 'creditCards';
	xhr.open('DELETE', 'api/portfolios/1/'+baORcc+'/'+bcid+'/'+type+'/'+id, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				if (baORcc === 'bankAccounts') {
					loadDeposits(bcid);
					loadWithdrawals(bcid);
				} else {
					loadPayments(bcid);
					loadPurchases(bcid);
				}
			} else {
				displayError('An error occured: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

