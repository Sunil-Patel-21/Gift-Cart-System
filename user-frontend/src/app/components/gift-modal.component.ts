import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-gift-modal',
  templateUrl: './gift-modal.component.html',
  styleUrls: ['./gift-modal.component.css']
})
export class GiftModalComponent {
  @Input() gift: any = null; // Gift data passed from parent
  @Input() isOpen: boolean = false; // Modal visibility state
  @Output() closeModal = new EventEmitter<void>(); // Event to close modal
  
  quantity: number = 1; // Selected quantity (default 1)
  isAddingToCart: boolean = false; // Loading state for add to cart
  selectedImageIndex: number = 0; // Current selected image index
  isZoomed: boolean = false; // Zoom state
  zoomX: number = 0; // Zoom X position
  zoomY: number = 0; // Zoom Y position
  imageLoading: boolean = true; // Image loading state

  constructor(private cartService: CartService, private toastService: ToastService) {}

  selectImage(index: number): void {
    this.selectedImageIndex = index;
    this.imageLoading = true;
  }

  nextImage(): void {
    const images = this.getImages();
    if (images.length > 1) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % images.length;
      this.imageLoading = true;
    }
  }

  prevImage(): void {
    const images = this.getImages();
    if (images.length > 1) {
      this.selectedImageIndex = this.selectedImageIndex === 0 
        ? images.length - 1 
        : this.selectedImageIndex - 1;
      this.imageLoading = true;
    }
  }

  getImages(): string[] {
    if (!this.gift || !this.gift.image) {
      return ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600'];
    }
    return Array.isArray(this.gift.image) ? this.gift.image : [this.gift.image];
  }

  getCurrentImage(): string {
    const images = this.getImages();
    return images[this.selectedImageIndex] || images[0];
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.zoomX = ((event.clientX - rect.left) / rect.width) * 100;
    this.zoomY = ((event.clientY - rect.top) / rect.height) * 100;
  }

  onMouseEnter(): void {
    this.isZoomed = true;
  }

  onMouseLeave(): void {
    this.isZoomed = false;
  }

  onImageLoad(): void {
    this.imageLoading = false;
  }

  /**
   * Increase quantity by 1
   */
  increaseQuantity(): void {
    if (this.quantity < this.gift.stock) {
      this.quantity++;
    }
  }

  /**
   * Decrease quantity by 1 (minimum 1)
   */
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  /**
   * Add gift to cart with selected quantity
   */
  addToCart(): void {
    this.isAddingToCart = true;
    this.cartService.addToCart(this.gift._id, this.quantity).subscribe({
      next: () => {
        this.isAddingToCart = false;
        this.toastService.success(`${this.gift.name} added to cart!`);
        this.close();
      },
      error: () => {
        this.isAddingToCart = false;
        this.toastService.error('Please login to add items to cart');
      }
    });
  }

  /**
   * Close modal and reset quantity
   */
  close(): void {
    this.quantity = 1;
    this.selectedImageIndex = 0;
    this.isZoomed = false;
    this.closeModal.emit();
  }

  /**
   * Close modal when clicking on backdrop
   */
  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  /**
   * Generate star rating array for display
   */
  getStars(rating: number = 4.5): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}
