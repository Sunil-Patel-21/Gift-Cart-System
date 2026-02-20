import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';

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

  constructor(private cartService: CartService) {}

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
        alert(`${this.gift.name} added to cart!`);
        this.close();
      },
      error: () => {
        this.isAddingToCart = false;
        alert('Please login to add items to cart');
      }
    });
  }

  /**
   * Close modal and reset quantity
   */
  close(): void {
    this.quantity = 1;
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
