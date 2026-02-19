import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';
import { GiftsComponent } from './components/gifts.component';
import { CategoriesComponent } from './components/categories.component';
import { OrdersComponent } from './components/orders.component';

import { AuthService } from './services/auth.service';
import { GiftService } from './services/gift.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GiftsComponent,
    CategoriesComponent,
    OrdersComponent
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
