import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-products',
  template: `
    <div style="min-height: 100vh; background: #f5f5f5;">
      <!-- Hero Slider Section -->
      <div style="position: relative; height: 500px; overflow: hidden;">
        <div style="position: relative; width: 100%; height: 100%;">
          <div *ngFor="let slide of slides; let i = index" 
               [style.display]="currentSlide === i ? 'block' : 'none'"
               style="position: absolute; width: 100%; height: 100%; transition: opacity 0.5s ease;">
            <img [src]="slide.image" [alt]="slide.title" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center; color: white; padding: 20px;">
                <h1 style="font-size: 56px; font-weight: 800; margin-bottom: 20px; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">{{ slide.title }}</h1>
                <p style="font-size: 24px; text-shadow: 1px 1px 5px rgba(0,0,0,0.5);">{{ slide.subtitle }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Slider Navigation -->
        <button (click)="prevSlide()" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; font-size: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: all 0.3s;">‹</button>
        <button (click)="nextSlide()" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.9); border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; font-size: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: all 0.3s;">›</button>
        
        <!-- Slider Dots -->
        <div style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px;">
          <span *ngFor="let slide of slides; let i = index" 
                (click)="goToSlide(i)"
                [style.background]="currentSlide === i ? 'white' : 'rgba(255,255,255,0.5)'"
                style="width: 12px; height: 12px; border-radius: 50%; cursor: pointer; transition: all 0.3s;"></span>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div style="background: white; padding: 30px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <div class="container">
          <div style="display: flex; gap: 15px; justify-content: center; align-items: stretch; flex-wrap: wrap; max-width: 1000px; margin: 0 auto;">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="filterGifts()" 
              placeholder="Search gifts..." 
              class="form-control" 
              style="flex: 1; min-width: 250px; padding: 16px 24px; border-radius: 12px; border: 2px solid #e0e0e0; font-size: 15px; transition: all 0.3s;" 
              onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.1)'" 
              onblur="this.style.borderColor='#e0e0e0'; this.style.boxShadow='none'">
            <select 
              [(ngModel)]="selectedCategory" 
              (change)="filterGifts()" 
              class="form-control" 
              style="min-width: 200px; padding: 16px 24px; border-radius: 12px; border: 2px solid #e0e0e0; font-size: 15px; background: white; cursor: pointer; transition: all 0.3s;" 
              onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.1)'" 
              onblur="this.style.borderColor='#e0e0e0'; this.style.boxShadow='none'">
              <option value="">All Categories</option>
              <option *ngFor="let category of categories" [value]="category._id">{{ category.name }}</option>
            </select>
            <button class="btn btn-primary" (click)="filterGifts()" style="padding: 16px 40px; font-size: 15px; font-weight: 600; white-space: nowrap; border-radius: 12px;">Search</button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px 0;">
        <div class="container" style="padding: 0 20px;">
        <h2 style="font-size: 36px; font-weight: 700; color: white; margin-bottom: 40px; text-align: center;">Our Gift Collection</h2>
        
        <div *ngIf="filteredGifts.length === 0" style="text-align: center; padding: 100px 20px;">
          <div style="font-size: 80px; margin-bottom: 20px;">🎁</div>
          <h3 style="color: #666; font-size: 28px; margin-bottom: 10px;">No gifts found</h3>
          <p style="color: #999; font-size: 16px;">Try adjusting your search or filters</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 35px;">
          <div *ngFor="let gift of filteredGifts" 
               style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); transition: all 0.4s ease; cursor: pointer; position: relative;" 
               onmouseover="this.style.transform='translateY(-15px)'; this.style.boxShadow='0 20px 50px rgba(0,0,0,0.2)'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 40px rgba(0,0,0,0.1)'"
               (click)="openGiftModal(gift)">
            
            <!-- Image Container -->
            <div style="position: relative; overflow: hidden; height: 250px; background: #f5f5f5;">
              <img 
                [src]="gift.image || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400'" 
                [alt]="gift.name" 
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
                onmouseover="this.style.transform='scale(1.1)'"
                onmouseout="this.style.transform='scale(1)'">
              
              <!-- Stock Badge -->
              <div *ngIf="gift.stock < 10 && gift.stock > 0" 
                   style="position: absolute; top: 15px; right: 15px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                Only {{ gift.stock }} left!
              </div>
              <div *ngIf="gift.stock === 0" 
                   style="position: absolute; top: 15px; right: 15px; background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                Out of Stock
              </div>
            </div>

            <!-- Content -->
            <div style="padding: 25px;">
              <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 12px; color: #333; line-height: 1.3; min-height: 56px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                {{ gift.name }}
              </h3>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px; min-height: 42px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                {{ gift.description }}
              </p>

              <!-- Price and Action -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 2px solid #f0f0f0;">
                <div>
                  <div style="font-size: 32px; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    ₹{{ gift.price }}
                  </div>
                  <div style="font-size: 12px; color: #999; margin-top: 4px;">
                    {{ gift.stock > 0 ? 'In Stock: ' + gift.stock : 'Out of Stock' }}
                  </div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button 
                    (click)="toggleWishlist(gift._id); $event.stopPropagation()" 
                    [style.background]="isInWishlist(gift._id) ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : '#f0f0f0'"
                    [style.color]="isInWishlist(gift._id) ? 'white' : '#666'"
                    style="border: none; width: 45px; height: 45px; border-radius: 10px; cursor: pointer; font-size: 18px; transition: all 0.3s;">
                    {{ isInWishlist(gift._id) ? '❤️' : '🤍' }}
                  </button>
                  <button 
                    class="btn btn-primary" 
                    (click)="addToCart(gift._id); $event.stopPropagation()" 
                    [disabled]="gift.stock === 0"
                    style="padding: 12px 28px; font-size: 14px; font-weight: 700; white-space: nowrap;">
                    {{ gift.stock > 0 ? '🛒 Add' : 'Unavailable' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      <!-- Gift Details Modal -->
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
  
  // Modal state
  selectedGift: any = null;
  isModalOpen: boolean = false;
  
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

  wishlistItems: string[] = [];

  constructor(
    private giftService: GiftService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadGifts();
    this.loadCategories();
    this.loadWishlist();
    this.startAutoSlide();
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
    }, 2000);
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
          alert('Removed from wishlist!');
        },
        error: () => alert('Please login to manage wishlist')
      });
    } else {
      this.wishlistService.addToWishlist(giftId).subscribe({
        next: () => {
          this.wishlistItems.push(giftId);
          alert('Added to wishlist!');
        },
        error: () => alert('Please login to manage wishlist')
      });
    }
  }
}
