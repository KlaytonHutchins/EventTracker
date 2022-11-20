import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios/1/creditCards';

  constructor(
    private http: HttpClient
  ) { }

  index(cid: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.url}/${cid}/purchases`).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('PurchaseService.index(): error getting Purchases: ' + err)
        );
      })
    );
  }

  create(cid: number, purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.url}/${cid}/purchases`, purchase).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
          () => new Error('PurchaseService.create(): Error creating Purchase: ' + err)
        );
      })
    );
  }

  update(cid: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.url}/${cid}/purchases/${purchase.id}`, purchase).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            () => new Error('PurchaseService.update(): Error updating Purchase: ' + err)
          );
        })
      );
  }


  destroy(cid: number, purchaseId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${cid}/purchases/${purchaseId}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('PurchaseService.destroy(): Error deleting Purchase: ' + err)
          );
        })
      );
  }

}
