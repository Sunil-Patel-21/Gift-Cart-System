import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  private apiUrl = 'http://localhost:5000/api/gifts';

  constructor(private http: HttpClient) {}

  getAllGifts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
