import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  template: `
    <div class="container">
      <h2>My Orders</h2>
      <div *ngIf="orders.length === 0">
        <p>No orders yet</p>
        <a routerLink="/products" class="btn btn-primary">Start Shopping</a>
      </div>
      <div *ngIf="orders.length > 0">
        <div *ngFor="let order of orders" style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3>Order ID: {{ order._id }}</h3>
          <p>Date: {{ order.createdAt | date }}</p>
          <p>Total: ₹{{ order.totalAmount }}</p>
          <p>Status: <span style="background: #28a745; color: white; padding: 5px 10px; border-radius: 4px;">{{ order.orderStatus }}</span></p>
          <p>Payment: {{ order.paymentMethod }} - {{ order.paymentStatus }}</p>
          <h4>Items:</h4>
          <ul>
            <li *ngFor="let item of order.items">
              {{ item.name }} - Qty: {{ item.quantity }} - ₹{{ item.price }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (response) => { this.orders = response.data; }
    });
  }
}
