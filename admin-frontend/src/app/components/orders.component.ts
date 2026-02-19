import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">📦 Order Management</h2>
        
        <div *ngIf="orders.length === 0" style="background: white; padding: 60px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <div style="font-size: 80px; margin-bottom: 20px;">📦</div>
          <p style="font-size: 20px; color: #666;">No orders found.</p>
        </div>

        <div *ngIf="orders.length > 0" style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); overflow-x: auto;">
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
                <td style="font-weight: 600; color: #1e3c72;">#{{ order._id.slice(-8) }}</td>
                <td>{{ order.user?.name }}</td>
                <td style="font-weight: 700; color: #1e3c72;">₹{{ order.totalAmount }}</td>
                <td>
                  <span [style.background]="getStatusColor(order.orderStatus)" 
                        style="padding: 6px 12px; border-radius: 15px; color: white; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                    {{ order.orderStatus }}
                  </span>
                </td>
                <td>{{ order.createdAt | date:'short' }}</td>
                <td>
                  <select (change)="updateStatus(order._id, $event.target.value)" 
                          [value]="order.orderStatus"
                          class="form-control" 
                          style="min-width: 150px; padding: 8px 12px; border-radius: 8px; border: 2px solid #e0e0e0; font-size: 13px; font-weight: 600;">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
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
    this.orderService.getAllOrders().subscribe({
      next: (response) => { this.orders = response.data; }
    });
  }

  updateStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, { orderStatus: status }).subscribe({
      next: () => { alert('Order status updated'); this.loadOrders(); }
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'pending': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'confirmed': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'shipped': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'delivered': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      'cancelled': 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)'
    };
    return colors[status] || 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
  }
}
