import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div style="min-height: 100vh; padding: 60px 0; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 48px; font-weight: 700; margin-bottom: 50px; text-align: center;">Admin Dashboard</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
          <a routerLink="/gifts" style="text-decoration: none;">
            <div style="background: white; padding: 50px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="font-size: 60px; margin-bottom: 20px;">🎁</div>
              <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 10px;">Manage Gifts</h3>
              <p style="color: #666;">Add, edit, and delete gifts</p>
            </div>
          </a>
          <a routerLink="/categories" style="text-decoration: none;">
            <div style="background: white; padding: 50px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="font-size: 60px; margin-bottom: 20px;">📂</div>
              <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 10px;">Manage Categories</h3>
              <p style="color: #666;">Organize gift categories</p>
            </div>
          </a>
          <a routerLink="/orders" style="text-decoration: none;">
            <div style="background: white; padding: 50px; border-radius: 20px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="font-size: 60px; margin-bottom: 20px;">📦</div>
              <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 10px;">Manage Orders</h3>
              <p style="color: #666;">Track and update orders</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
