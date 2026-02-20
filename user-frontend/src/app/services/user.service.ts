import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, data, { headers: this.getHeaders() });
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, data, { headers: this.getHeaders() });
  }

  getAddresses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/addresses`, { headers: this.getHeaders() });
  }

  addAddress(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addresses`, data, { headers: this.getHeaders() });
  }

  updateAddress(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/addresses/${id}`, data, { headers: this.getHeaders() });
  }

  deleteAddress(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/addresses/${id}`, { headers: this.getHeaders() });
  }
}
