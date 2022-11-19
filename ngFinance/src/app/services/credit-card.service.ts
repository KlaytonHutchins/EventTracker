import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CreditCard } from '../models/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(`${this.url}/creditCards`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('CreditCardService.index(): error getting Credit Cards: ' + err)
        );
      })
    );
  }

  show(creditCardId: number): Observable<CreditCard> {
    return this.http.get<CreditCard>(`${this.url}/creditCards/${creditCardId}`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('CreditCardService.show(): error getting Credit Card: ' + err)
        );
      })
    );
  }

  create(creditCard: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(`${this.url}/creditCards`, creditCard).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('CreditCardService.create(): Error creating Credit Card: ' + err)
        );
      })
    );
  }

  update(creditCard: CreditCard): Observable<CreditCard> {
    return this.http.put<CreditCard>(`${this.url}/creditCards/${creditCard.id}`, creditCard).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            () => new Error('CreditCardService.update(): Error updating Credit Card: ' + err)
          );
        })
      );
  }


  destroy(creditCardId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/creditCards/${creditCardId}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('CreditCardService.destroy(): Error deleting Credit Card: ' + err)
          );
        })
      );
  }

}
