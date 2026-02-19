import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'payment/:orderId', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'order-confirmation/:orderId', component: OrderConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: UserOrdersComponent, canActivate: [AuthGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/gifts', 
    component: GiftsComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/categories', 
    component: CategoriesComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/orders', 
    component: OrdersComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
