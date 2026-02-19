import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  template: `
    <div class="container">
      <h2>Browse Gifts</h2>
      <div style="margin: 20px 0;">
        <input type="text" [(ngModel)]="searchTerm" (input)="filterGifts()" placeholder="Search gifts..." class="form-control" style="max-width: 300px; display: inline-block; margin-right: 10px;">
        <select [(ngModel)]="selectedCategory" (change)="filterGifts()" class="form-control" style="max-width: 200px; display: inline-block;">
          <option value="">All Categories</option>
          <option *ngFor="let category of categories" [value]="category._id">{{ category.name }}</option>
        </select>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
        <div *ngFor="let gift of filteredGifts" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <img [src]="gift.image" [alt]="gift.name" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px;">
          <h3>{{ gift.name }}</h3>
          <p>{{ gift.description }}</p>
          <p style="font-size: 20px; font-weight: bold; color: #28a745;">₹{{ gift.price }}</p>
          <p>Stock: {{ gift.stock }}</p>
          <button class="btn btn-primary" (click)="addToCart(gift._id)" [disabled]="gift.stock === 0">
            {{ gift.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  gifts: any[] = [];
  filteredGifts: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private giftService: GiftService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadGifts();
    this.loadCategories();
  }

  loadGifts(): void {
    this.giftService.getAllGifts().subscribe({
      next: (response) => {
        this.gifts = response.data;
        this.filteredGifts = this.gifts;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    });
  }

  filterGifts(): void {
    this.filteredGifts = this.gifts.filter(gift => {
      const matchesSearch = gift.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || gift.category._id === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  addToCart(giftId: string): void {
    this.cartService.addToCart(giftId, 1).subscribe({
      next: () => { alert('Added to cart!'); },
      error: () => { alert('Please login to add items to cart'); }
    });
  }
}
