import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">Shopping Cart</h2>
        <div *ngIf="cartItems.length === 0" style="background: white; padding: 60px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <p style="font-size: 20px; color: #666; margin-bottom: 30px;">Your cart is empty</p>
          <a routerLink="/products" class="btn btn-primary" style="font-size: 16px;">Continue Shopping</a>
        </div>
        <div *ngIf="cartItems.length > 0" style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <table class="table">
            <thead>
              <tr>
                <th style="font-size: 16px; color: #333;">Gift</th>
                <th style="font-size: 16px; color: #333;">Price</th>
                <th style="font-size: 16px; color: #333;">Quantity</th>
                <th style="font-size: 16px; color: #333;">Total</th>
                <th style="font-size: 16px; color: #333;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of cartItems">
                <td style="font-weight: 600;">{{ item.gift?.name }}</td>
                <td>₹{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td style="font-weight: 700; color: #667eea;">₹{{ item.price * item.quantity }}</td>
                <td>
                  <button class="btn btn-sm btn-danger" (click)="removeFromCart(item.gift._id)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: right; margin: 30px 0; padding-top: 20px; border-top: 2px solid #eee;">
            <h3 style="font-size: 32px; font-weight: 800; color: #667eea; margin-bottom: 20px;">Total: ₹{{ totalAmount }}</h3>
            <button class="btn btn-warning" (click)="clearCart()">Clear Cart</button>
            <button class="btn btn-success" (click)="proceedToCheckout()">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cart: any = null;
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

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
        next: () => { alert('Item removed'); this.loadCart(); }
      });
    }
  }

  clearCart(): void {
    if (confirm('Clear entire cart?')) {
      this.cartService.clearCart().subscribe({
        next: () => { alert('Cart cleared'); this.loadCart(); }
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
