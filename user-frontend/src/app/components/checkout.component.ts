import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="container">
      <h2>Checkout</h2>
      <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <h3>Order Summary</h3>
        <p>Total Items: {{ cart?.items?.length }}</p>
        <p>Total Amount: ₹{{ totalAmount }}</p>
      </div>
      <form (ngSubmit)="placeOrder()">
        <h3>Shipping Address</h3>
        <div class="form-group">
          <label>Street</label>
          <input type="text" [(ngModel)]="shippingAddress.street" name="street" required class="form-control">
        </div>
        <div class="form-group">
          <label>City</label>
          <input type="text" [(ngModel)]="shippingAddress.city" name="city" required class="form-control">
        </div>
        <div class="form-group">
          <label>State</label>
          <input type="text" [(ngModel)]="shippingAddress.state" name="state" required class="form-control">
        </div>
        <div class="form-group">
          <label>Zip Code</label>
          <input type="text" [(ngModel)]="shippingAddress.zipCode" name="zipCode" required class="form-control">
        </div>
        <h3>Payment Method</h3>
        <select [(ngModel)]="paymentMethod" name="paymentMethod" class="form-control">
          <option value="COD">Cash on Delivery</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
        <button type="submit" class="btn btn-success" style="margin-top: 20px;">Place Order</button>
      </form>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cart: any = null;
  totalAmount: number = 0;
  shippingAddress = { street: '', city: '', state: '', zipCode: '', country: 'India' };
  paymentMethod: string = 'COD';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        this.totalAmount = this.cart.totalAmount;
      }
    });
  }

  placeOrder(): void {
    const orderData = {
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        const orderId = response.data._id;
        this.router.navigate(['/payment', orderId]);
      },
      error: () => { alert('Order creation failed'); }
    });
  }
}
