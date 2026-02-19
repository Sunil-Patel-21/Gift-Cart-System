import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminLoginComponent } from './components/admin/admin-login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { GiftsComponent } from './components/admin/gifts/gifts.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { OrdersComponent } from './components/admin/orders/orders.component';

import { LoginComponent } from './components/user/login.component';
import { RegisterComponent } from './components/user/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProductsComponent } from './components/user/products/products.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { UserOrdersComponent } from './components/user/orders/orders.component';
import { PaymentComponent } from './components/user/payment/payment.component';
import { OrderConfirmationComponent } from './components/user/order-confirmation/order-confirmation.component';

import { AuthService } from './services/auth.service';
import { GiftService } from './services/gift.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';
import { PaymentService } from './services/payment.service';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    DashboardComponent,
    GiftsComponent,
    CategoriesComponent,
    OrdersComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    UserOrdersComponent,
    PaymentComponent,
    OrderConfirmationComponent
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
    OrderService,
    CartService,
    PaymentService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
