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
          <div style="font-size: 80px; margin-bottom: 20px;">🛒</div>
          <p style="font-size: 20px; color: #666; margin-bottom: 30px;">Your cart is empty</p>
          <a routerLink="/products" class="btn btn-primary" style="font-size: 16px;">Continue Shopping</a>
        </div>
        
        <div *ngIf="cartItems.length > 0" style="display: grid; grid-template-columns: 1fr 400px; gap: 30px;">
          <!-- Cart Items -->
          <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h3 style="font-size: 24px; font-weight: 700; color: #333; margin-bottom: 25px;">Cart Items ({{ cartItems.length }})</h3>
            
            <div *ngFor="let item of cartItems" style="display: flex; gap: 20px; padding: 20px; margin-bottom: 15px; border: 2px solid #f0f0f0; border-radius: 15px; transition: all 0.3s;" onmouseover="this.style.borderColor='#667eea'" onmouseout="this.style.borderColor='#f0f0f0'">
              <!-- Product Image -->
              <img [src]="item.gift?.image || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200'" 
                   [alt]="item.gift?.name" 
                   style="width: 120px; height: 120px; object-fit: cover; border-radius: 10px; flex-shrink: 0;">
              
              <!-- Product Details -->
              <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <h4 style="font-size: 18px; font-weight: 700; color: #333; margin-bottom: 8px;">{{ item.gift?.name }}</h4>
                  <p style="color: #666; font-size: 14px; margin-bottom: 12px;">{{ item.gift?.description }}</p>
                  <div style="font-size: 24px; font-weight: 800; color: #667eea;">₹{{ item.price }}</div>
                </div>
                
                <!-- Quantity Controls -->
                <div style="display: flex; align-items: center; gap: 20px; margin-top: 15px;">
                  <div style="display: flex; align-items: center; gap: 0; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <button (click)="decreaseQuantity(item.gift._id, item.quantity)" 
                            style="width: 40px; height: 40px; border: none; background: #f8f9fa; cursor: pointer; font-size: 20px; font-weight: 700; color: #667eea; transition: all 0.3s;"
                            onmouseover="this.style.background='#667eea'; this.style.color='white'"
                            onmouseout="this.style.background='#f8f9fa'; this.style.color='#667eea'">−</button>
                    <span style="width: 50px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: #333; background: white;">{{ item.quantity }}</span>
                    <button (click)="increaseQuantity(item.gift._id, item.quantity)" 
                            style="width: 40px; height: 40px; border: none; background: #f8f9fa; cursor: pointer; font-size: 20px; font-weight: 700; color: #667eea; transition: all 0.3s;"
                            onmouseover="this.style.background='#667eea'; this.style.color='white'"
                            onmouseout="this.style.background='#f8f9fa'; this.style.color='#667eea'">+</button>
                  </div>
                  
                  <button (click)="removeFromCart(item.gift._id)" 
                          class="btn btn-sm btn-danger" 
                          style="padding: 8px 20px;">
                    🗑️ Remove
                  </button>
                  
                  <div style="margin-left: auto; text-align: right;">
                    <div style="font-size: 12px; color: #999; margin-bottom: 4px;">Subtotal</div>
                    <div style="font-size: 20px; font-weight: 800; color: #333;">₹{{ item.price * item.quantity }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Price Summary -->
          <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); height: fit-content; position: sticky; top: 20px;">
            <h3 style="font-size: 24px; font-weight: 700; color: #333; margin-bottom: 25px;">Price Details</h3>
            
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
              <span style="color: #666; font-size: 16px;">Price ({{ cartItems.length }} items)</span>
              <span style="font-weight: 600; color: #333; font-size: 16px;">₹{{ totalAmount }}</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
              <span style="color: #666; font-size: 16px;">Delivery Charges</span>
              <span style="font-weight: 600; color: #11998e; font-size: 16px;">FREE</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding: 20px 0; margin-top: 10px; border-top: 2px solid #333;">
              <span style="font-size: 20px; font-weight: 700; color: #333;">Total Amount</span>
              <span style="font-size: 24px; font-weight: 800; color: #667eea;">₹{{ totalAmount }}</span>
            </div>
            
            <div style="background: #e8f5e9; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
              <span style="color: #11998e; font-weight: 600; font-size: 14px;">🎉 You will save ₹0 on this order</span>
            </div>
            
            <button class="btn btn-success" (click)="proceedToCheckout()" style="width: 100%; font-size: 18px; padding: 15px; margin-bottom: 10px;">
              Proceed to Checkout
            </button>
            <button class="btn btn-warning" (click)="clearCart()" style="width: 100%; font-size: 16px; padding: 12px;">
              Clear Cart
            </button>
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

  increaseQuantity(giftId: string, currentQuantity: number): void {
    this.cartService.addToCart(giftId, 1).subscribe({
      next: () => { this.loadCart(); }
    });
  }

  decreaseQuantity(giftId: string, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(giftId, currentQuantity - 1).subscribe({
        next: () => { this.loadCart(); }
      });
    } else {
      this.removeFromCart(giftId);
    }
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
