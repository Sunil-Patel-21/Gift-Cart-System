import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any = { gifts: [] };
  loading = false;

  constructor(
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.loading = true;
    this.wishlistService.getWishlist().subscribe({
      next: (data) => {
        this.wishlist = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading wishlist:', error);
        this.loading = false;
      }
    });
  }

  removeFromWishlist(giftId: string) {
    this.wishlistService.removeFromWishlist(giftId).subscribe({
      next: () => this.loadWishlist(),
      error: (error) => console.error('Error removing from wishlist:', error)
    });
  }

  moveToCart(giftId: string) {
    this.wishlistService.moveToCart(giftId).subscribe({
      next: () => {
        alert('Item moved to cart!');
        this.loadWishlist();
      },
      error: (error) => console.error('Error moving to cart:', error)
    });
  }
}
