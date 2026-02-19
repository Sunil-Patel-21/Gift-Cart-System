import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container" style="max-width: 900px;">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">Checkout</h2>
        
        <div style="background: white; padding: 30px; margin-bottom: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h3 style="font-size: 24px; font-weight: 700; color: #667eea; margin-bottom: 20px;">📦 Order Summary</h3>
          <div style="display: flex; justify-content: space-between; padding: 15px; background: #f8f9fa; border-radius: 10px;">
            <span style="font-size: 16px; color: #666;">Total Items:</span>
            <span style="font-size: 18px; font-weight: 700; color: #333;">{{ cart?.items?.length }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 15px; margin-top: 10px; background: #667eea; border-radius: 10px;">
            <span style="font-size: 18px; color: white; font-weight: 600;">Total Amount:</span>
            <span style="font-size: 24px; font-weight: 800; color: white;">₹{{ totalAmount }}</span>
          </div>
        </div>

        <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <form (ngSubmit)="placeOrder()">
            <h3 style="font-size: 24px; font-weight: 700; color: #667eea; margin-bottom: 25px;">🏠 Shipping Address</h3>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Street Address</label>
              <input type="text" [(ngModel)]="shippingAddress.street" name="street" required class="form-control" placeholder="Enter your street address">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="form-group">
                <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">City</label>
                <input type="text" [(ngModel)]="shippingAddress.city" name="city" required class="form-control" placeholder="City">
              </div>
              <div class="form-group">
                <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">State</label>
                <input type="text" [(ngModel)]="shippingAddress.state" name="state" required class="form-control" placeholder="State">
              </div>
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Zip Code</label>
              <input type="text" [(ngModel)]="shippingAddress.zipCode" name="zipCode" required class="form-control" placeholder="Enter zip code">
            </div>
            
            <h3 style="font-size: 24px; font-weight: 700; color: #667eea; margin: 30px 0 25px;">💳 Payment Method</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;">
              <label style="cursor: pointer;">
                <input type="radio" [(ngModel)]="paymentMethod" name="paymentMethod" value="COD" style="display: none;">
                <div [style.background]="paymentMethod === 'COD' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'" 
                     [style.color]="paymentMethod === 'COD' ? 'white' : '#333'"
                     style="padding: 20px; text-align: center; border-radius: 15px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                  💵 Cash on Delivery
                </div>
              </label>
              <label style="cursor: pointer;">
                <input type="radio" [(ngModel)]="paymentMethod" name="paymentMethod" value="Card" style="display: none;">
                <div [style.background]="paymentMethod === 'Card' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'" 
                     [style.color]="paymentMethod === 'Card' ? 'white' : '#333'"
                     style="padding: 20px; text-align: center; border-radius: 15px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                  💳 Card
                </div>
              </label>
              <label style="cursor: pointer;">
                <input type="radio" [(ngModel)]="paymentMethod" name="paymentMethod" value="UPI" style="display: none;">
                <div [style.background]="paymentMethod === 'UPI' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'" 
                     [style.color]="paymentMethod === 'UPI' ? 'white' : '#333'"
                     style="padding: 20px; text-align: center; border-radius: 15px; font-weight: 600; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                  📱 UPI
                </div>
              </label>
            </div>
            
            <button type="submit" class="btn btn-success" style="width: 100%; font-size: 18px; padding: 15px;">Place Order →</button>
          </form>
        </div>
      </div>
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
