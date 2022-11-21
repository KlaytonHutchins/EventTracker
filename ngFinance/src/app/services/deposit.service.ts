import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Deposit } from '../models/deposit';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1/bankAccounts';

  constructor(
    private http: HttpClient
  ) { }

  index(bid: number): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(`${this.url}/${bid}/deposits`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('DepositService.index(): error getting Deposits: ' + err)
        );
      })
    );
  }

  create(bid: number, deposit: Deposit): Observable<Deposit> {
    return this.http.post<Deposit>(`${this.url}/${bid}/deposits`, deposit).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('DepositService.create(): Error creating Deposit: ' + err)
        );
      })
    );
  }

  update(bid: number, deposit: Deposit): Observable<Deposit> {
    return this.http.put<Deposit>(`${this.url}/${bid}/deposits/${deposit.id}`, deposit).pipe(
      catchError((err: any) => {
          console.log(deposit);
          console.error(err);
          return throwError(
            () => new Error('DepositService.update(): Error updating Deposit: ' + err)
          );
        })
      );
  }


  destroy(bid: number, depositId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${bid}/deposits/${depositId}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('DepositService.destroy(): Error deleting Deposit: ' + err)
          );
        })
      );
  }

}
