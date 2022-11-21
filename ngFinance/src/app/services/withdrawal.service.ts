import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Withdrawal } from '../models/withdrawal';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1/bankAccounts';

  constructor(
    private http: HttpClient
  ) { }

  index(bid: number): Observable<Withdrawal[]> {
    return this.http.get<Withdrawal[]>(`${this.url}/${bid}/withdrawals`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('WithdrawalService.index(): error getting Withdrawals: ' + err)
        );
      })
    );
  }

  create(bid: number, withdrawal: Withdrawal): Observable<Withdrawal> {
    return this.http.post<Withdrawal>(`${this.url}/${bid}/withdrawals`, withdrawal).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('WithdrawalService.create(): Error creating Withdrawal: ' + err)
        );
      })
    );
  }

  update(bid: number, withdrawal: Withdrawal): Observable<Withdrawal> {
    console.log('in service: '+withdrawal.description);
    return this.http.put<Withdrawal>(`${this.url}/${bid}/withdrawals/${withdrawal.id}`, withdrawal).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            () => new Error('WithdrawalService.update(): Error updating Withdrawal: ' + err)
          );
        })
      );
  }


  destroy(bid: number, withdrawalId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${bid}/withdrawals/${withdrawalId}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('WithdrawalService.destroy(): Error deleting Withdrawal: ' + err)
          );
        })
      );
  }

}
