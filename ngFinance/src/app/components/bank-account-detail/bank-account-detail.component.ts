import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccount } from 'src/app/models/bank-account';
import { Deposit } from 'src/app/models/deposit';
import { Withdrawal } from 'src/app/models/withdrawal';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { DepositService } from 'src/app/services/deposit.service';
import { WithdrawalService } from 'src/app/services/withdrawal.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-bank-account-detail',
  templateUrl: './bank-account-detail.component.html',
  styleUrls: ['./bank-account-detail.component.css']
})
export class BankAccountDetailComponent implements OnInit {

  bankAcct: BankAccount | null = null;
  bankAccountId: number = 0;
  withdrawals: Withdrawal[] = [];
  deposits: Deposit[] = [];
  newWith: Withdrawal = new Withdrawal();
  newDep: Deposit = new Deposit();
  editWith: Withdrawal | null = null;
  editDep: Deposit | null = null;
  selectedWith: Withdrawal | null = null;
  selectedDep: Deposit | null = null;

  constructor(
    private bankAccountSvc: BankAccountService,
    private withdrawalSvc: WithdrawalService,
    private depositSvc: DepositService,
    private router: Router
  ) { }

  setBAId() {
    let strId = localStorage.getItem("id");
    if (strId) {
      this.bankAccountId = parseInt(strId);
    }
    this.bankAccountSvc.show(this.bankAccountId).subscribe({
      next: (data) => {
        this.bankAcct = data;
      },
      error: (fail) => {
      }
    });
  }

  reload() {
    this.withdrawalSvc.index(this.bankAccountId).subscribe({
      next: (data) => {
        console.log(data);
        this.withdrawals = data;
      },
      error: (fail) => {
        console.error('BankAccountDetailComponent.reload: error getting Withdrawals');
        console.error(fail);
      }
    });
    this.depositSvc.index(this.bankAccountId).subscribe({
      next: (data) => {
        console.log(data);
        this.deposits = data;
      },
      error: (fail) => {
        console.error('BankAccountDetailComponent.reload: error getting Deposits');
        console.error(fail);
      }
    });
  }

  addWithdrawal(withdrawal: Withdrawal) {
    this.withdrawalSvc.create(this.bankAccountId, withdrawal).subscribe({
      next: (result) => {
        this.reload();
        this.newWith = new Withdrawal();
      },
      error: (err) => {
        console.error('BankAccountDetailComponent.addWithdrawal() error creating Withdrawal');
        console.error(err);
      }
    });
  }

  addDeposit(deposit: Deposit) {
    this.depositSvc.create(this.bankAccountId, deposit).subscribe({
      next: (result) => {
        this.reload();
        this.newDep = new Deposit();
      },
      error: (err) => {
        console.error('BankAccountDetailComponent.addDeposit() error creating Deposit');
        console.error(err);
      }
    });
  }

  setEditWithdrawal(): void {
    this.editWith = Object.assign({}, this.selectedWith);
  }

  updateWithdrawal(newWith: Withdrawal): void {
    this.withdrawalSvc.update(this.bankAccountId, this.newWith).subscribe({
      next: (result) => {
        this.selectedWith = result;
        this.editWith = null;
        this.reload();
      },
      error: (err) => {
        console.error('BankAccountDetailComponent.updateWithdrawal() error updating Withdrawal');
        console.error(err);
      }
    });
  }

  setEditDeposit(): void {
    this.editDep = Object.assign({}, this.selectedDep);
  }

  updateDeposit(newDep: Deposit): void {
    this.depositSvc.update(this.bankAccountId, this.newDep).subscribe({
      next: (result) => {
        this.selectedDep = result;
        this.editDep = null;
        this.reload();
      },
      error: (err) => {
        console.error('BankAccountDetailComponent.updateDeposit() error updating Deposit');
        console.error(err);
      }
    });
  }

  deleteWithdrawal(withdrawalId: number) {
    this.withdrawalSvc.destroy(this.bankAccountId, withdrawalId).subscribe({
      next: (result) => {
        this.reload();
      },
      error: (err) => {
        console.error('BankAccountDetailComponent.deleteWithdrawal() error deleting Withdrawal');
        console.error(err);
      }
    });
  }

  deleteDeposit(depositId: number) {
    this.depositSvc.destroy(this.bankAccountId, depositId).subscribe({
      next: (result) => {
        this.reload();
      },
      error: (err) => {
        console.error('BankAccountDetailComponent.deleteDeposit() error deleting Deposit');
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.setBAId();
    this.reload();
  }

}
