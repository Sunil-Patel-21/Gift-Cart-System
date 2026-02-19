import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div style="min-height: 100vh; background: url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920') center/cover; position: relative;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6);"></div>
      <div class="container" style="text-align: center; padding: 150px 20px; position: relative; z-index: 1; color: white;">
        <h1 style="font-size: 64px; font-weight: 800; margin-bottom: 20px; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">Welcome to Gift Cart</h1>
        <p style="font-size: 24px; margin-bottom: 40px; text-shadow: 1px 1px 5px rgba(0,0,0,0.5);">Find the perfect gift for your loved ones</p>
        <button class="btn btn-primary" (click)="browseGifts()" style="font-size: 18px; padding: 15px 50px;">Browse Gifts</button>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(private router: Router) {}

  browseGifts(): void {
    this.router.navigate(['/products']);
  }
}
