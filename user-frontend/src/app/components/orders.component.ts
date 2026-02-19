import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">📦 My Orders</h2>
        
        <div *ngIf="orders.length === 0" style="background: white; padding: 60px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <div style="font-size: 80px; margin-bottom: 20px;">📭</div>
          <p style="font-size: 20px; color: #666; margin-bottom: 30px;">No orders yet</p>
          <a routerLink="/products" class="btn btn-primary" style="font-size: 16px;">Start Shopping</a>
        </div>
        
        <div *ngIf="orders.length > 0" style="display: grid; gap: 25px;">
          <div *ngFor="let order of orders" style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
              <div>
                <h3 style="font-size: 18px; font-weight: 700; color: #333; margin-bottom: 8px;">Order #{{ order._id.slice(-8) }}</h3>
                <p style="color: #999; font-size: 14px;">{{ order.createdAt | date:'medium' }}</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 28px; font-weight: 800; color: #667eea; margin-bottom: 5px;">₹{{ order.totalAmount }}</div>
                <span [style.background]="getStatusColor(order.orderStatus)" 
                      style="padding: 6px 16px; border-radius: 20px; color: white; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                  {{ order.orderStatus }}
                </span>
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h4 style="font-size: 16px; font-weight: 700; color: #333; margin-bottom: 15px;">Order Items</h4>
              <div style="display: grid; gap: 12px;">
                <div *ngFor="let item of order.items" style="display: flex; justify-content: space-between; padding: 12px; background: #f8f9fa; border-radius: 10px;">
                  <div>
                    <span style="font-weight: 600; color: #333;">{{ item.name }}</span>
                    <span style="color: #999; margin-left: 10px;">× {{ item.quantity }}</span>
                  </div>
                  <span style="font-weight: 700; color: #667eea;">₹{{ item.price }}</span>
                </div>
              </div>
            </div>
            
            <div style="display: flex; gap: 15px; padding-top: 15px; border-top: 1px solid #f0f0f0;">
              <div style="flex: 1; padding: 12px; background: #f8f9fa; border-radius: 10px;">
                <div style="font-size: 12px; color: #999; margin-bottom: 4px;">Payment Method</div>
                <div style="font-weight: 600; color: #333;">{{ order.paymentMethod }}</div>
              </div>
              <div style="flex: 1; padding: 12px; background: #f8f9fa; border-radius: 10px;">
                <div style="font-size: 12px; color: #999; margin-bottom: 4px;">Payment Status</div>
                <div style="font-weight: 600; color: #333;">{{ order.paymentStatus }}</div>
              </div>
            </div>
          </div>
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

  getStatusColor(status: string): string {
    const colors: any = {
      'pending': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'confirmed': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'shipped': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'delivered': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      'cancelled': 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)'
    };
    return colors[status] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
}
