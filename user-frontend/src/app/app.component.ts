import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { GiftService } from './services/gift.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  searchTerm: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private giftService: GiftService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    if (this.router.url !== '/products') {
      this.router.navigate(['/products'], { queryParams: { search: this.searchTerm } });
    } else {
      window.dispatchEvent(new CustomEvent('search', { detail: this.searchTerm }));
    }
  }
}
