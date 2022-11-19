import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BankAccount } from '../models/bank-account';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.url}/bankAccounts`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('BankAccountService.index(): error getting Bank Accounts: ' + err)
        );
      })
    );
  }

  show(bankAcctId: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.url}/bankAccounts/${bankAcctId}`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('BankAccountService.show(): error getting Bank Account: ' + err)
        );
      })
    );
  }

  create(bankAcct: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${this.url}/bankAccounts`, bankAcct).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('BankAccountService.create(): Error creating Bank Account: ' + err)
        );
      })
    );
  }

  update(bankAcct: BankAccount): Observable<BankAccount> {
    return this.http.put<BankAccount>(`${this.url}/bankAccounts/${bankAcct.id}`, bankAcct).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            () => new Error('BankAccountService.update(): Error updating Bank Account: ' + err)
          );
        })
      );
  }


  destroy(bankAcctId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/bankAccounts/${bankAcctId}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('BankAccountService.destroy(): Error deleting Bank Account: ' + err)
          );
        })
      );
  }

}
