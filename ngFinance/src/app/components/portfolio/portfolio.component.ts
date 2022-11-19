import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/models/bank-account';
import { CreditCard } from 'src/app/models/credit-card';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  bankAccounts: BankAccount[] = [];
  creditCards: CreditCard[] = [];

  constructor(
    private bankAccountService: BankAccountService,
    private creditCardService: CreditCardService
  ) { }

  loadBankAccounts() {
    this.bankAccountService.index().subscribe({
      next: (accts) => {
        this.bankAccounts = accts;
      },
      error: (fail) => {
        console.error('Error');
        console.log(fail);
      }
    })
  }

  loadCreditCards() {
    this.creditCardService.index().subscribe({
      next: (ccs) => {
        this.creditCards = ccs;
      },
      error: (fail) => {
        console.error('Error');
        console.log(fail);
      }
    })
  }

  ngOnInit(): void {
    this.loadBankAccounts();
    this.loadCreditCards();
  }

}
