import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  baseUrl = 'http://localhost:8086/';
  url = this.baseUrl + 'api/portfolios';

  constructor(
    private http: HttpClient
  ) { }
}
