import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any = null;
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        this.cartItems = this.cart.items;
        this.totalAmount = this.cart.totalAmount;
      }
    });
  }

  removeFromCart(giftId: string): void {
    if (confirm('Remove this item from cart?')) {
      this.cartService.removeFromCart(giftId).subscribe({
        next: (response) => {
          alert('Item removed from cart');
          this.loadCart();
        }
      });
    }
  }

  clearCart(): void {
    if (confirm('Clear entire cart?')) {
      this.cartService.clearCart().subscribe({
        next: (response) => {
          alert('Cart cleared');
          this.loadCart();
        }
      });
    }
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
