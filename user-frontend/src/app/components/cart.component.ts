import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <div class="container">
      <h2>Shopping Cart</h2>
      <div *ngIf="cartItems.length === 0">
        <p>Your cart is empty</p>
        <a routerLink="/products" class="btn btn-primary">Continue Shopping</a>
      </div>
      <div *ngIf="cartItems.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>Gift</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of cartItems">
              <td>{{ item.gift?.name }}</td>
              <td>₹{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>₹{{ item.price * item.quantity }}</td>
              <td>
                <button class="btn btn-sm btn-danger" (click)="removeFromCart(item.gift._id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: right; margin: 20px 0;">
          <h3>Total Amount: ₹{{ totalAmount }}</h3>
          <button class="btn btn-warning" (click)="clearCart()">Clear Cart</button>
          <button class="btn btn-success" (click)="proceedToCheckout()">Proceed to Checkout</button>
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
