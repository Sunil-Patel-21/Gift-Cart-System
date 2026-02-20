import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:5000/api/wishlist';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getWishlist(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  addToWishlist(giftId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { giftId }, { headers: this.getHeaders() });
  }

  removeFromWishlist(giftId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${giftId}`, { headers: this.getHeaders() });
  }

  moveToCart(giftId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/move-to-cart`, { giftId }, { headers: this.getHeaders() });
  }
}
