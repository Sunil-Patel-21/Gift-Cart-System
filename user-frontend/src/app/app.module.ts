import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { HomeComponent } from './components/home.component';
import { ProductsComponent } from './components/products.component';
import { CartComponent } from './components/cart.component';
import { CheckoutComponent } from './components/checkout.component';
import { OrdersComponent } from './components/orders.component';
import { PaymentComponent } from './components/payment.component';
import { OrderConfirmationComponent } from './components/order-confirmation.component';
import { GiftModalComponent } from './components/gift-modal.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer.component';
import { ToastComponent } from './components/toast.component';

import { AuthService } from './services/auth.service';
import { GiftService } from './services/gift.service';
import { CategoryService } from './services/category.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { PaymentService } from './services/payment.service';
import { WishlistService } from './services/wishlist.service';
import { UserService } from './services/user.service';
import { ToastService } from './services/toast.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    PaymentComponent,
    OrderConfirmationComponent,
    GiftModalComponent,
    WishlistComponent,
    OrderTrackingComponent,
    ProfileComponent,
    FooterComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    GiftService,
    CategoryService,
    CartService,
    OrderService,
    PaymentService,
    WishlistService,
    UserService,
    ToastService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
