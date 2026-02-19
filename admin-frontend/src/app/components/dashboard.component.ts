import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <h2>Admin Dashboard</h2>
      <div class="dashboard-links">
        <a routerLink="/gifts" class="btn btn-primary">Manage Gifts</a>
        <a routerLink="/categories" class="btn btn-primary">Manage Categories</a>
        <a routerLink="/orders" class="btn btn-primary">Manage Orders</a>
      </div>
    </div>
  `
})
export class DashboardComponent {}
