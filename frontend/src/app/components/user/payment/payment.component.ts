import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  orderId: string = '';
  orderAmount: number = 0;
  
  paymentData = {
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  };
  
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
      next: (response) => {
        this.orderAmount = response.data.totalAmount;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load order details';
      }
    });
  }

  processPayment(): void {
    if (!this.validatePaymentForm()) {
      return;
    }

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
      next: (response) => {
        this.isProcessing = false;
        alert('Payment Successful!');
        this.router.navigate(['/order-confirmation', this.orderId]);
      },
      error: (error) => {
        this.isProcessing = false;
        this.errorMessage = error.error.message || 'Payment failed. Please try again.';
      }
    });
  }

  validatePaymentForm(): boolean {
    if (!this.paymentData.cardNumber || this.paymentData.cardNumber.length < 16) {
      this.errorMessage = 'Please enter a valid 16-digit card number';
      return false;
    }
    if (!this.paymentData.cardHolderName) {
      this.errorMessage = 'Please enter card holder name';
      return false;
    }
    if (!this.paymentData.expiryDate) {
      this.errorMessage = 'Please enter expiry date';
      return false;
    }
    if (!this.paymentData.cvv || this.paymentData.cvv.length !== 3) {
      this.errorMessage = 'Please enter valid 3-digit CVV';
      return false;
    }
    return true;
  }

  cancelPayment(): void {
    this.router.navigate(['/cart']);
  }
}
