import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  template: `
    <div style="min-height: 100vh; background: #f5f5f5;">
      <!-- Hero Slider Section -->
      <div style="position: relative; height: 400px; overflow: hidden;">
        <div style="position: relative; width: 100%; height: 100%;">
          <div *ngFor="let slide of slides; let i = index" 
               [style.display]="currentSlide === i ? 'block' : 'none'"
               style="position: absolute; width: 100%; height: 100%; transition: opacity 0.5s ease;">
            <img [src]="slide.image" [alt]="slide.title" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center; color: white; padding: 20px;">
                <h1 style="font-size: 48px; font-weight: 800; margin-bottom: 15px; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">{{ slide.title }}</h1>
                <p style="font-size: 20px; text-shadow: 1px 1px 5px rgba(0,0,0,0.5);">{{ slide.subtitle }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <button (click)="prevSlide()" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-size: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: all 0.3s;">‹</button>
        <button (click)="nextSlide()" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-size: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: all 0.3s;">›</button>
        
        <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
          <span *ngFor="let slide of slides; let i = index" 
                (click)="goToSlide(i)"
                [style.background]="currentSlide === i ? 'white' : 'rgba(255,255,255,0.5)'"
                style="width: 10px; height: 10px; border-radius: 50%; cursor: pointer; transition: all 0.3s;"></span>
        </div>
      </div>

      <!-- Products Section -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 0;">
        <div class="container" style="padding: 0 20px; max-width: 1400px; margin: 0 auto;">
          
          <!-- Header with Title and Filters -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 20px;">
            <h2 style="font-size: 36px; font-weight: 700; color: white; margin: 0;">Our Gift Collection</h2>
            
            <!-- Filter Section -->
            <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
              <select 
                [(ngModel)]="selectedCategory" 
                (change)="filterGifts()" 
                style="padding: 14px 24px; border-radius: 12px; border: 2px solid white; font-size: 14px; font-weight: 600; background: rgba(255,255,255,0.95); cursor: pointer; min-width: 180px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); transition: all 0.3s; color: #667eea;" 
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.2)'" 
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.15)'">
                <option value="">🎯 All Categories</option>
                <option *ngFor="let category of categories" [value]="category._id">{{ category.name }}</option>
              </select>
              
              <select 
                [(ngModel)]="sortBy" 
                (change)="sortGifts()" 
                style="padding: 14px 24px; border-radius: 12px; border: 2px solid white; font-size: 14px; font-weight: 600; background: rgba(255,255,255,0.95); cursor: pointer; min-width: 180px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); transition: all 0.3s; color: #667eea;" 
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.2)'" 
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.15)'">
                <option value="">🔄 Sort By</option>
                <option value="price-low">⬆️ Price: Low to High</option>
                <option value="price-high">⬇️ Price: High to Low</option>
                <option value="name">🔤 Name: A to Z</option>
              </select>
            </div>
          </div>
        
          <div *ngIf="filteredGifts.length === 0" style="text-align: center; padding: 80px 20px; background: white; border-radius: 20px;">
            <div style="font-size: 60px; margin-bottom: 15px;">🎁</div>
            <h3 style="color: #666; font-size: 24px; margin-bottom: 8px;">No gifts found</h3>
            <p style="color: #999; font-size: 14px;">Try adjusting your search or filters</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
            <div *ngFor="let gift of filteredGifts" 
                 style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.12); transition: all 0.3s ease; cursor: pointer; position: relative;" 
                 onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.2)'" 
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 30px rgba(0,0,0,0.12)'"
                 (click)="openGiftModal(gift)">
              
              <div style="position: relative; overflow: hidden; height: 220px; background: #f5f5f5;">
                <img 
                  [src]="gift.image || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400'" 
                  [alt]="gift.name" 
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
                  onmouseover="this.style.transform='scale(1.08)'"
                  onmouseout="this.style.transform='scale(1)'">
                
                <div *ngIf="gift.stock < 10 && gift.stock > 0" 
                     style="position: absolute; top: 12px; right: 12px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 700; box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
                  Only {{ gift.stock }} left!
                </div>
                <div *ngIf="gift.stock === 0" 
                     style="position: absolute; top: 12px; right: 12px; background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%); color: white; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 700; box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
                  Out of Stock
                </div>
              </div>

              <div style="padding: 20px;">
                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px; color: #333; line-height: 1.3; min-height: 48px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  {{ gift.name }}
                </h3>
                
                <p style="color: #666; font-size: 13px; line-height: 1.5; margin-bottom: 15px; min-height: 40px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  {{ gift.description }}
                </p>

                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 2px solid #f0f0f0;">
                  <div>
                    <div style="font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                      ₹{{ gift.price }}
                    </div>
                    <div style="font-size: 11px; color: #999; margin-top: 3px;">
                      {{ gift.stock > 0 ? 'In Stock: ' + gift.stock : 'Out of Stock' }}
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button 
                      (click)="toggleWishlist(gift._id); $event.stopPropagation()" 
                      [style.background]="isInWishlist(gift._id) ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : '#f0f0f0'"
                      [style.color]="isInWishlist(gift._id) ? 'white' : '#666'"
                      style="border: none; width: 40px; height: 40px; border-radius: 8px; cursor: pointer; font-size: 16px; transition: all 0.3s;">
                      {{ isInWishlist(gift._id) ? '❤️' : '🤍' }}
                    </button>
                    <button 
                      class="btn btn-primary" 
                      (click)="addToCart(gift._id); $event.stopPropagation()" 
                      [disabled]="gift.stock === 0"
                      style="padding: 10px 20px; font-size: 13px; font-weight: 700; white-space: nowrap;">
                      {{ gift.stock > 0 ? '🛒 Add' : 'Unavailable' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <app-gift-modal 
        [gift]="selectedGift" 
        [isOpen]="isModalOpen" 
        (closeModal)="closeGiftModal()">
      </app-gift-modal>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  gifts: any[] = [];
  filteredGifts: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  sortBy: string = '';
  selectedGift: any = null;
  isModalOpen: boolean = false;
  wishlistItems: string[] = [];
  
  currentSlide: number = 0;
  slides = [
    {
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920',
      title: 'Perfect Gifts for Every Occasion',
      subtitle: 'Discover unique presents that bring joy'
    },
    {
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920',
      title: 'Celebrate Special Moments',
      subtitle: 'Find the ideal gift for your loved ones'
    },
    {
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1920',
      title: 'Thoughtful Gifts, Delivered',
      subtitle: 'Shop our curated collection today'
    }
  ];

  constructor(
    private giftService: GiftService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadGifts();
    this.loadCategories();
    this.loadWishlist();
    this.startAutoSlide();
    
    window.addEventListener('search', (e: any) => {
      this.searchTerm = e.detail;
      this.filterGifts();
    });
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
    this.sortGifts();
  }

  sortGifts(): void {
    if (this.sortBy === 'price-low') {
      this.filteredGifts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      this.filteredGifts.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'name') {
      this.filteredGifts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  addToCart(giftId: string): void {
    this.cartService.addToCart(giftId, 1).subscribe({
      next: () => { this.toastService.success('Added to cart!'); },
      error: () => { this.toastService.error('Please login to add items to cart'); }
    });
  }

  openGiftModal(gift: any): void {
    this.selectedGift = gift;
    this.isModalOpen = true;
  }

  closeGiftModal(): void {
    this.isModalOpen = false;
    this.selectedGift = null;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  startAutoSlide(): void {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (data) => {
        this.wishlistItems = data.gifts.map((g: any) => g._id);
      },
      error: () => {}
    });
  }

  isInWishlist(giftId: string): boolean {
    return this.wishlistItems.includes(giftId);
  }

  toggleWishlist(giftId: string): void {
    if (this.isInWishlist(giftId)) {
      this.wishlistService.removeFromWishlist(giftId).subscribe({
        next: () => {
          this.wishlistItems = this.wishlistItems.filter(id => id !== giftId);
          this.toastService.success('Removed from wishlist!');
        },
        error: () => this.toastService.error('Please login to manage wishlist')
      });
    } else {
      this.wishlistService.addToWishlist(giftId).subscribe({
        next: () => {
          this.wishlistItems.push(giftId);
          this.toastService.success('Added to wishlist!');
        },
        error: () => this.toastService.error('Please login to manage wishlist')
      });
    }
  }

  onSearch(): void {
    this.filterGifts();
  }
}
