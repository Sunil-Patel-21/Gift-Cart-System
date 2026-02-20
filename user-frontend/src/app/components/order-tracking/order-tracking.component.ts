import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  order: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrder(orderId);
    }
  }

  loadOrder(orderId: string) {
    this.orderService.getOrder(orderId).subscribe({
      next: (response) => {
        this.order = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.loading = false;
      }
    });
  }

  getStatusIcon(status: string): string {
    const icons: any = {
      'pending': '⏳',
      'confirmed': '✅',
      'processing': '⚙️',
      'shipped': '🚚',
      'out_for_delivery': '📦',
      'delivered': '🎉',
      'cancelled': '❌'
    };
    return icons[status] || '📋';
  }

  isStatusCompleted(status: string): boolean {
    if (!this.order) return false;
    const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
    const currentIndex = statuses.indexOf(this.order.orderStatus);
    const checkIndex = statuses.indexOf(status);
    return checkIndex <= currentIndex;
  }
}
