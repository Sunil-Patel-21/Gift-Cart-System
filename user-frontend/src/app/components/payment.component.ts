import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  template: `
    <div class="container" style="max-width: 600px; margin: 50px auto;">
      <h2>Payment</h2>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> {{ orderId }}</p>
        <p><strong>Total Amount:</strong> Rs {{ orderAmount }}</p>
      </div>
      <form (ngSubmit)="processPayment()">
        <h3>Enter Payment Details</h3>
        <p style="color: #666; font-size: 14px;">Note: This is a dummy payment. No real transaction will occur.</p>
        <div class="form-group">
          <label>Card Number</label>
          <input type="text" [(ngModel)]="paymentData.cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="16" required class="form-control">
        </div>
        <div class="form-group">
          <label>Card Holder Name</label>
          <input type="text" [(ngModel)]="paymentData.cardHolderName" name="cardHolderName" required class="form-control">
        </div>
        <div class="form-group">
          <label>Expiry Date</label>
          <input type="text" [(ngModel)]="paymentData.expiryDate" name="expiryDate" placeholder="MM/YY" maxlength="5" required class="form-control">
        </div>
        <div class="form-group">
          <label>CVV</label>
          <input type="text" [(ngModel)]="paymentData.cvv" name="cvv" placeholder="123" maxlength="3" required class="form-control">
        </div>
        <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <button type="submit" class="btn btn-success" [disabled]="isProcessing">
          {{ isProcessing ? 'Processing...' : 'Pay Rs ' + orderAmount }}
        </button>
        <button type="button" class="btn btn-secondary" (click)="cancelPayment()" [disabled]="isProcessing">Cancel</button>
      </form>
    </div>
  `
})
export class PaymentComponent implements OnInit {
  orderId: string = '';
  orderAmount: number = 0;
  paymentData = { cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '' };
  isProcessing: boolean = false;
  errorMessage: string = '';

  constructor(
    private paymentService: PaymentService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId') || '';
    if (this.orderId) {
      this.loadOrderDetails();
    }
  }

  loadOrderDetails(): void {
    this.orderService.getOrder(this.orderId).subscribe({
      next: (response) => { this.orderAmount = response.data.totalAmount; },
      error: () => { this.errorMessage = 'Failed to load order details'; }
    });
  }

  processPayment(): void {
    this.isProcessing = true;
    this.errorMessage = '';

    const paymentRequest = {
      orderId: this.orderId,
      cardNumber: this.paymentData.cardNumber,
      cardHolderName: this.paymentData.cardHolderName,
      expiryDate: this.paymentData.expiryDate,
      cvv: this.paymentData.cvv
    };

    this.paymentService.processPayment(paymentRequest).subscribe({
      next: () => {
        this.isProcessing = false;
        alert('Payment Successful!');
        this.router.navigate(['/order-confirmation', this.orderId]);
      },
      error: (error) => {
        this.isProcessing = false;
        this.errorMessage = error.error.message || 'Payment failed';
      }
    });
  }

  cancelPayment(): void {
    this.router.navigate(['/cart']);
  }
}
