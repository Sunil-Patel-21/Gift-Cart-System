import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:5000/api/payment';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  processPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/process`, paymentData, { headers: this.getHeaders() });
  }

  getPaymentStatus(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${orderId}`, { headers: this.getHeaders() });
  }
}
