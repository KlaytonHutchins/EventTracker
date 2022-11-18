import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BankAccount } from '../models/bank-account';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1/';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.url + 'bankAccounts').pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('BankAccountService.index(): error: ' + err)
        );
      })
    );
  }

}
