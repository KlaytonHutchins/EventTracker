import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CreditCard } from '../models/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1/';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.url + 'creditCards').pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('BankAccountService.index(): error: ' + err)
        );
      })
    );
  }

}
