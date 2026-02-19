import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="container" style="text-align: center; padding: 50px;">
      <h1>Welcome to Gift Cart System</h1>
      <p>Find the perfect gift for your loved ones</p>
      <button class="btn btn-primary" (click)="browseGifts()">Browse Gifts</button>
    </div>
  `
})
export class HomeComponent {
  constructor(private router: Router) {}

  browseGifts(): void {
    this.router.navigate(['/products']);
  }
}
