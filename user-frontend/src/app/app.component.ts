import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { GiftService } from './services/gift.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  searchTerm: string = '';
  userProfilePicture: string = '';
  searchFocused: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private giftService: GiftService,
    private userService: UserService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.loadUserProfile();
      }
    });
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.isLoggedIn) {
        this.loadUserProfile();
      }
    });
  }

  loadUserProfile() {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.userProfilePicture = response.data.profilePicture || '';
      },
      error: () => {}
    });
  }

  logout(): void {
    this.authService.logout();
    this.userProfilePicture = '';
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
