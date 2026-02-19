import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gift } from '../models/gift.model';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  private apiUrl = 'http://localhost:5000/api/gifts';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllGifts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getGift(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createGift(gift: any): Observable<any> {
    return this.http.post(this.apiUrl, gift, { headers: this.getHeaders() });
  }

  updateGift(id: string, gift: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, gift, { headers: this.getHeaders() });
  }

  deleteGift(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
