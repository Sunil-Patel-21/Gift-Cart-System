import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container" style="max-width: 600px;">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 30px; text-align: center;">💳 Payment</h2>
        
        <div style="background: white; padding: 30px; margin-bottom: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h3 style="font-size: 20px; font-weight: 700; color: #667eea; margin-bottom: 20px;">Order Summary</h3>
          <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee;">
            <span style="color: #666;">Order ID:</span>
            <span style="font-weight: 600; color: #333;">{{ orderId }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 15px 0; margin-top: 10px;">
            <span style="font-size: 18px; font-weight: 600; color: #333;">Total Amount:</span>
            <span style="font-size: 28px; font-weight: 800; color: #667eea;">₹{{ orderAmount }}</span>
          </div>
        </div>

        <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <form (ngSubmit)="processPayment()">
            <h3 style="font-size: 24px; font-weight: 700; color: #667eea; margin-bottom: 10px;">Enter Payment Details</h3>
            <p style="color: #999; font-size: 14px; margin-bottom: 25px; padding: 10px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
              ⚠️ This is a dummy payment. No real transaction will occur.
            </p>
            
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Card Number</label>
              <input type="text" [(ngModel)]="paymentData.cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="16" required class="form-control">
            </div>
            <div class="form-group">
              <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Card Holder Name</label>
              <input type="text" [(ngModel)]="paymentData.cardHolderName" name="cardHolderName" placeholder="John Doe" required class="form-control">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div class="form-group">
                <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">Expiry Date</label>
                <input type="text" [(ngModel)]="paymentData.expiryDate" name="expiryDate" placeholder="MM/YY" maxlength="5" required class="form-control">
              </div>
              <div class="form-group">
                <label style="font-weight: 600; color: #333; margin-bottom: 8px; display: block;">CVV</label>
                <input type="text" [(ngModel)]="paymentData.cvv" name="cvv" placeholder="123" maxlength="3" required class="form-control">
              </div>
            </div>
            
            <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            
            <button type="submit" class="btn btn-success" [disabled]="isProcessing" style="width: 100%; font-size: 18px; padding: 15px; margin-top: 10px;">
              {{ isProcessing ? '⏳ Processing...' : '✓ Pay ₹' + orderAmount }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="cancelPayment()" [disabled]="isProcessing" style="width: 100%; margin-top: 10px;">
              Cancel
            </button>
          </form>
        </div>
      </div>
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
