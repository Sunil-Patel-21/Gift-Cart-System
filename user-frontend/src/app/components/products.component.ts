import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">Browse Gifts</h2>
        <div style="margin: 30px 0; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <input type="text" [(ngModel)]="searchTerm" (input)="filterGifts()" placeholder="Search gifts..." class="form-control" style="max-width: 350px; padding: 15px; border-radius: 25px; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
          <select [(ngModel)]="selectedCategory" (change)="filterGifts()" class="form-control" style="max-width: 250px; padding: 15px; border-radius: 25px; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <option value="">All Categories</option>
            <option *ngFor="let category of categories" [value]="category._id">{{ category.name }}</option>
          </select>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; margin-top: 40px;">
          <div *ngFor="let gift of filteredGifts" style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
            <img [src]="gift.image || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400'" [alt]="gift.name" style="width: 100%; height: 220px; object-fit: cover;">
            <div style="padding: 20px;">
              <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 10px; color: #333;">{{ gift.name }}</h3>
              <p style="color: #666; font-size: 14px; margin-bottom: 15px; height: 40px; overflow: hidden;">{{ gift.description }}</p>
              <p style="font-size: 28px; font-weight: 800; color: #667eea; margin-bottom: 10px;">₹{{ gift.price }}</p>
              <p style="color: #999; font-size: 13px; margin-bottom: 15px;">Stock: {{ gift.stock }}</p>
              <button class="btn btn-primary" (click)="addToCart(gift._id)" [disabled]="gift.stock === 0" style="width: 100%;">
                {{ gift.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
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
