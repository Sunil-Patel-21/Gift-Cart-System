import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  template: `
    <div class="container" style="max-width: 800px; margin: 50px auto;">
      <div style="background: #d4edda; color: #155724; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px;">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. Your payment has been processed.</p>
      </div>
      <div *ngIf="order" style="background: white; padding: 30px; border-radius: 8px;">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {{ order._id }}</p>
        <p><strong>Order Date:</strong> {{ order.createdAt | date:'medium' }}</p>
        <p><strong>Order Status:</strong> {{ order.orderStatus }}</p>
        <p><strong>Payment Status:</strong> {{ order.paymentStatus }}</p>
        <p><strong>Total Amount:</strong> Rs {{ order.totalAmount }}</p>
        <h4>Order Items</h4>
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
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>Rs {{ item.price }}</td>
              <td>Rs {{ item.price * item.quantity }}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 30px;">
          <button class="btn btn-primary" (click)="viewAllOrders()">View All Orders</button>
          <button class="btn btn-secondary" (click)="continueShopping()">Continue Shopping</button>
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
