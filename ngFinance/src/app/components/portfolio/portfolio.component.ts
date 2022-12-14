import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  selectedBA: BankAccount | null = null;
  newBA: BankAccount = new BankAccount();
  editBA: BankAccount | null = null;
  selectedCC: CreditCard | null = null;
  newCC: CreditCard = new CreditCard();
  editCC: CreditCard | null = null;

  constructor(
    private bankAccountService: BankAccountService,
    private creditCardService: CreditCardService,
    private router: Router
  ) { }

  setId(id: number) {
    localStorage.setItem("id", ""+id);
  }

  displayBA(bid: number) {
    this.setId(bid);
    this.router.navigate(['/bankAccount']);
  }

  displayCC(cid: number) {
    this.setId(cid);
    this.router.navigate(['/creditCard']);
  }

  reload() {
    this.bankAccountService.index().subscribe({
      next: (data) => {
        this.bankAccounts = data;
      },
      error: (fail) => {
        console.error('PorfolioComponent.reload: error getting Bank Accounts');
        console.error(fail);
      }
    });
    this.creditCardService.index().subscribe({
      next: (data) => {
        this.creditCards = data;
      },
      error: (fail) => {
        console.error('PorfolioComponent.reload: error getting Credit Cards');
        console.error(fail);
      }
    });
  }

  addBankAccount(bankAcct: BankAccount) {
    this.bankAccountService.create(bankAcct).subscribe({
      next: (result) => {
        this.reload();
        this.newBA = new BankAccount();
      },
      error: (err) => {
        console.error('PortfolioComponent.addBankAccount() error creating Todo');
        console.error(err);
      }
    });
  }

  addCreditCard(creditCard: CreditCard) {
    this.creditCardService.create(creditCard).subscribe({
      next: (result) => {
        this.reload();
        this.newCC = new CreditCard();
      },
      error: (err) => {
        console.error('PortfolioComponent.addCreditCard() error creating Todo');
        console.error(err);
      }
    });
  }

  cancelEditBACC(): void {
    this.editBA = null;
    this.editCC = null;
  }

  setEditBankAcct(bankAccount: BankAccount): void {
    this.editBA = bankAccount;
  }

  updateBankAcct(newBA: BankAccount): void {
    this.bankAccountService.update(newBA).subscribe({
      next: (result) => {
        this.selectedBA = result;
        this.editBA = null;
        this.editCC = null;
        this.reload();
      },
      error: (err) => {
        console.error('PortfolioComponent.updateBankAcct() error updating Bank Account');
        console.error(err);
      }
    });
  }

  setEditCreditCard(creditCard: CreditCard): void {
    this.editCC = creditCard;
  }

  updateCreditCard(newCC: CreditCard): void {
    this.creditCardService.update(newCC).subscribe({
      next: (result) => {
        this.selectedCC = result;
        this.editCC = null;
        this.editBA = null;
        this.reload();
      },
      error: (err) => {
        console.error('PortfolioComponent.updateCreditCard() error updating Credit Card');
        console.error(err);
      }
    });
  }

  deleteBankAccount(bankAcctId: number) {
    this.bankAccountService.destroy(bankAcctId).subscribe({
      next: (result) => {
        this.reload();
      },
      error: (err) => {
        console.error('PortfolioComponent.deleteBankAccount() error deleting Bank Account');
        console.error(err);
      }
    });
  }

  deleteCreditCard(creditCardId: number) {
    this.creditCardService.destroy(creditCardId).subscribe({
      next: (result) => {
        this.reload();
      },
      error: (err) => {
        console.error('PortfolioComponent.deleteCreditCard() error deleting Credit Card');
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.reload();
  }

}
