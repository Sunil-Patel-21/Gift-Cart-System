import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container" style="max-width: 900px;">
        <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 40px; text-align: center; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <div style="font-size: 80px; margin-bottom: 15px;">✓</div>
          <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 10px;">Order Placed Successfully!</h2>
          <p style="font-size: 18px; opacity: 0.9;">Thank you for your order. Your payment has been processed.</p>
        </div>
        
        <div *ngIf="order" style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h3 style="font-size: 28px; font-weight: 700; color: #667eea; margin-bottom: 25px;">📋 Order Details</h3>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
            <div style="padding: 20px; background: #f8f9fa; border-radius: 15px;">
              <div style="font-size: 13px; color: #999; margin-bottom: 8px;">Order ID</div>
              <div style="font-size: 16px; font-weight: 700; color: #333;">{{ order._id }}</div>
            </div>
            <div style="padding: 20px; background: #f8f9fa; border-radius: 15px;">
              <div style="font-size: 13px; color: #999; margin-bottom: 8px;">Order Date</div>
              <div style="font-size: 16px; font-weight: 700; color: #333;">{{ order.createdAt | date:'medium' }}</div>
            </div>
            <div style="padding: 20px; background: #f8f9fa; border-radius: 15px;">
              <div style="font-size: 13px; color: #999; margin-bottom: 8px;">Order Status</div>
              <div style="font-size: 16px; font-weight: 700; color: #11998e;">{{ order.orderStatus }}</div>
            </div>
            <div style="padding: 20px; background: #f8f9fa; border-radius: 15px;">
              <div style="font-size: 13px; color: #999; margin-bottom: 8px;">Payment Status</div>
              <div style="font-size: 16px; font-weight: 700; color: #11998e;">{{ order.paymentStatus }}</div>
            </div>
          </div>

          <div style="padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; margin-bottom: 30px;">
            <div style="font-size: 14px; color: rgba(255,255,255,0.8); margin-bottom: 8px;">Total Amount</div>
            <div style="font-size: 36px; font-weight: 800; color: white;">₹{{ order.totalAmount }}</div>
          </div>

          <h4 style="font-size: 22px; font-weight: 700; color: #333; margin-bottom: 20px;">Order Items</h4>
          <div style="overflow-x: auto;">
            <table class="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of order.items">
                  <td style="font-weight: 600;">{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>₹{{ item.price }}</td>
                  <td style="font-weight: 700; color: #667eea;">₹{{ item.price * item.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="display: flex; gap: 15px; margin-top: 30px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
            <button class="btn btn-primary" (click)="viewAllOrders()" style="flex: 1; font-size: 16px;">View All Orders</button>
            <button class="btn btn-success" (click)="continueShopping()" style="flex: 1; font-size: 16px;">Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderConfirmationComponent implements OnInit {
  order: any = null;
  orderId: string = '';
  
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId') || '';
    if (this.orderId) {
      this.loadOrderDetails();
    }
  }

  loadOrderDetails(): void {
    this.orderService.getOrder(this.orderId).subscribe({
      next: (response) => { this.order = response.data; },
      error: () => {
        alert('Failed to load order details');
        this.router.navigate(['/orders']);
      }
    });
  }

  viewAllOrders(): void {
    this.router.navigate(['/orders']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
