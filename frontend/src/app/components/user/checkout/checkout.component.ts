import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: any = null;
  totalAmount: number = 0;
  
  shippingAddress = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  };
  
  paymentMethod: string = 'COD';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        this.totalAmount = this.cart.totalAmount;
      }
    });
  }

  placeOrder(): void {
    const orderData = {
      shippingAddress: this.shippingAddress,
      paymentMethod: this.paymentMethod
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        const orderId = response.data._id;
        this.router.navigate(['/payment', orderId]);
      },
      error: (error) => {
        alert('Order creation failed');
      }
    });
  }
}
