import { Component, OnInit } from '@angular/core';
import { GiftService } from '../../../services/gift.service';
import { CategoryService } from '../../../services/category.service';
import { CartService } from '../../../services/cart.service';
import { Gift } from '../../../models/gift.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  gifts: Gift[] = [];
  filteredGifts: Gift[] = [];
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
      const matchesCategory = !this.selectedCategory || gift.categoryId === Number(this.selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }

  addToCart(giftId: string): void {
    this.cartService.addToCart(giftId, 1).subscribe({
      next: (response) => {
        alert('Added to cart!');
      },
      error: (error) => {
        alert('Please login to add items to cart');
      }
    });
  }
}
