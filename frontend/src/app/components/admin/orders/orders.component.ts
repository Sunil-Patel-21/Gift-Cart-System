import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      }
    });
  }

  viewOrder(order: any): void {
    this.selectedOrder = order;
  }

  updateStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, { status }).subscribe({
      next: () => {
        alert('Order status updated');
        this.loadOrders();
      }
    });
  }

  closeDetails(): void {
    this.selectedOrder = null;
  }
}
