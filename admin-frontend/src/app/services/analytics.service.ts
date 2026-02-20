import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('admin_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAnalytics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics`, { headers: this.getHeaders() });
  }
}
