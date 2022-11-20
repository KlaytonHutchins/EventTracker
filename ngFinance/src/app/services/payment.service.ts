import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1/creditCards';

  constructor(
    private http: HttpClient
  ) { }

  index(cid: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.url}/${cid}/payments`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('PaymentService.index(): error getting Payments: ' + err)
        );
      })
    );
  }

  create(cid: number, payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.url}/${cid}/payments`, payment).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('PaymentService.create(): Error creating Payment: ' + err)
        );
      })
    );
  }

  update(cid: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.url}/${cid}/payments/${payment.id}`, payment).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            () => new Error('PaymentService.update(): Error updating Payment: ' + err)
          );
        })
      );
  }


  destroy(cid: number, paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${cid}/payments/${paymentId}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('PaymentService.destroy(): Error deleting Payment: ' + err)
          );
        })
      );
  }

}
