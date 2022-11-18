import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/models/bank-account';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bankAccounts: BankAccount[] = [];

  constructor(
    private bankAccountService: BankAccountService
  ) { }

  loadBankAccounts() {
    this.bankAccountService.index().subscribe({
      next: (accts) => {
        this.bankAccounts = accts;
        console.log(this.bankAccounts);
      },
      error: (fail) => {
        console.error('Error');
        console.log(fail);
      }
    })
  }

  ngOnInit(): void {
    this.loadBankAccounts();
  }

}
