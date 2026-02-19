import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  template: `
    <div class="container">
      <h2>Order Management</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>{{ order._id }}</td>
            <td>{{ order.user?.name }}</td>
            <td>₹{{ order.totalAmount }}</td>
            <td>{{ order.orderStatus }}</td>
            <td>{{ order.createdAt | date }}</td>
            <td>
              <select (change)="updateStatus(order._id, $event.target.value)" class="form-control">
                <option value="pending" [selected]="order.orderStatus === 'pending'">Pending</option>
                <option value="confirmed" [selected]="order.orderStatus === 'confirmed'">Confirmed</option>
                <option value="shipped" [selected]="order.orderStatus === 'shipped'">Shipped</option>
                <option value="delivered" [selected]="order.orderStatus === 'delivered'">Delivered</option>
                <option value="cancelled" [selected]="order.orderStatus === 'cancelled'">Cancelled</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
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
    this.orderService.getAllOrders().subscribe({
      next: (response) => { this.orders = response.data; }
    });
  }

  updateStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, { orderStatus: status }).subscribe({
      next: () => { alert('Order status updated'); this.loadOrders(); }
    });
  }
}
