window.addEventListener('load', function() {
	console.log('script loaded');
	init();
});

function init() {
	// setup event listeners
	// load inital value
	document.getElementById('detailDiv').style.display = 'none';
	loadBankAccountList();
	loadCreditCardList();
	document.getElementsByName('newBankAcct')[0].addBankAcct.addEventListener('click', function(event) {
		event.preventDefault();
		let bankAcct = {institutionName: document.getElementsByName('newBankAcct')[0].bankAcct.value}
		if (bankAcct.institutionName !== '') {
			createBankAcct(bankAcct);
		}
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
			td.textContent = bankAcct.balance;
			tr.appendChild(td);
			bankAcctsBody.appendChild(tr);
			tr.addEventListener('click', function(event) {
				event.preventDefault();
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
			td.textContent = creditCard.balance;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = creditCard.creditLimit;
			tr.appendChild(td);
			
			creditCardsBody.appendChild(tr);
			tr.addEventListener('click', function(event) {
				event.preventDefault();
				// individual bank account view
			});
		}
	}
};

function displayDeposits(bankAcctId, deposits) {
	document.getElementById('bankAcctDiv').style.display = 'none';
	document.getElementById('creditCardDiv').style.display = 'none';
	document.getElementById('detailDiv').style.display = 'flex';
	let depositPaymentHeader = document.getElementById('depositPaymentHeader');
	depositPaymentHeader.textContent = 'Deposits';
	let depositPaymentButton = document.getElementsByName('depositPaymentButton')[0];
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
			console.log(deposit);
			createDeposit(bankAcctId, deposit);
		}
	});
	let depositBody = document.getElementById('depositPaymentBody');
	depositBody.textContent = '';
	if (deposits && Array.isArray(deposits) && deposits.length > 0) {
		for (let deposit of deposits) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			
			td.textContent = deposit.amount;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = deposit.timestamp;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = deposit.description;
			tr.appendChild(td);
			
			depositBody.appendChild(tr);
		}
	}
};

function displayWithdrawals(bankAcctId, withdrawals) {
	document.getElementById('bankAcctDiv').style.display = 'none';
	document.getElementById('creditCardDiv').style.display = 'none';
	document.getElementById('detailDiv').style.display = 'flex';
	let withdrawalPurchaseHeader = document.getElementById('withdrawalPurchaseHeader');
	withdrawalPurchaseHeader.textContent = 'Withdrawals';
	let withdrawalPurchaseButton = document.getElementsByName('withdrawalPurchaseButton')[0];
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
			
			td.textContent = withdrawal.amount;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = withdrawal.timestamp;
			tr.appendChild(td);
			
			td = document.createElement('td');
			td.textContent = withdrawal.description;
			tr.appendChild(td);
			
			withdrawalBody.appendChild(tr);
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
				bankAcct = JSON.parse(xhr.responseText);
				loadDeposits(bankAcct.id);
				loadWithdrawals(bankAcct.id);
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

