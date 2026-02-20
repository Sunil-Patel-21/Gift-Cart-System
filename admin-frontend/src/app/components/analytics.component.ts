import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  template: `
    <div style="min-height: 100vh; padding: 40px 0; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
      <div class="container">
        <h2 style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 40px; text-align: center;">📊 Sales Analytics Dashboard</h2>
        
        <!-- Summary Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 40px;">
          <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); color: white;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Total Revenue</div>
                <div style="font-size: 36px; font-weight: 800;">₹{{ analytics?.totalRevenue || 0 }}</div>
              </div>
              <div style="font-size: 50px; opacity: 0.3;">💰</div>
            </div>
          </div>

          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); color: white;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Total Orders</div>
                <div style="font-size: 36px; font-weight: 800;">{{ analytics?.totalOrders || 0 }}</div>
              </div>
              <div style="font-size: 50px; opacity: 0.3;">📦</div>
            </div>
          </div>

          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); color: white;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 10px;">Top Products</div>
                <div style="font-size: 36px; font-weight: 800;">{{ analytics?.topSellingGifts?.length || 0 }}</div>
              </div>
              <div style="font-size: 50px; opacity: 0.3;">🎁</div>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 30px; margin-bottom: 40px;">
          <!-- Category Sales Chart -->
          <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 25px;">📊 Category Sales Distribution</h3>
            <canvas id="categoryChart" style="max-height: 300px;"></canvas>
          </div>

          <!-- Top Products Chart -->
          <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 25px;">🏆 Top Selling Products</h3>
            <canvas id="topProductsChart" style="max-height: 300px;"></canvas>
          </div>
        </div>

        <!-- Order Status Chart -->
        <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-bottom: 40px;">
          <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 25px;">📈 Order Status Overview</h3>
          <div style="max-width: 600px; margin: 0 auto;">
            <canvas id="orderStatusChart"></canvas>
          </div>
        </div>

        <!-- Top Selling Gifts Table -->
        <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin-bottom: 30px;">
          <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 25px;">🏆 Top 5 Selling Gifts</h3>
          <div *ngIf="analytics?.topSellingGifts?.length === 0" style="text-align: center; padding: 40px; color: #999;">
            No sales data available yet
          </div>
          <table class="table" *ngIf="analytics?.topSellingGifts?.length > 0">
            <thead>
              <tr>
                <th style="width: 60px;">Rank</th>
                <th>Gift Name</th>
                <th>Quantity Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let gift of analytics?.topSellingGifts; let i = index">
                <td>
                  <span style="display: inline-block; width: 35px; height: 35px; line-height: 35px; text-align: center; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-weight: 700;">
                    {{ i + 1 }}
                  </span>
                </td>
                <td style="font-weight: 600; color: #333;">{{ gift.name }}</td>
                <td style="color: #667eea; font-weight: 700;">{{ gift.totalQuantity }} units</td>
                <td style="color: #11998e; font-weight: 700;">₹{{ gift.totalRevenue }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Category-wise Sales Details -->
        <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h3 style="font-size: 24px; font-weight: 700; color: #1e3c72; margin-bottom: 25px;">📂 Category-wise Sales Details</h3>
          <div *ngIf="analytics?.categoryWiseSales?.length === 0" style="text-align: center; padding: 40px; color: #999;">
            No category data available
          </div>
          <div *ngFor="let category of analytics?.categoryWiseSales" style="padding: 15px; margin-bottom: 15px; border-radius: 12px; background: #f8f9fa; border-left: 4px solid #667eea;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: 700; color: #333; font-size: 16px;">{{ category.categoryName }}</span>
              <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 600;">
                {{ category.totalQuantity }} sold
              </span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666;">
              <span>Revenue:</span>
              <span style="font-weight: 700; color: #11998e;">₹{{ category.totalRevenue }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  analytics: any = null;
  private categoryChart: any;
  private topProductsChart: any;
  private orderStatusChart: any;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  ngAfterViewInit(): void {
    // Charts will be created after data is loaded
  }

  loadAnalytics(): void {
    this.analyticsService.getAnalytics().subscribe({
      next: (response) => {
        this.analytics = response.data;
        console.log('Analytics data:', this.analytics);
        setTimeout(() => this.createCharts(), 100);
      },
      error: (error) => {
        console.error('Error loading analytics:', error);
        alert('Failed to load analytics data');
      }
    });
  }

  createCharts(): void {
    this.createCategoryChart();
    this.createTopProductsChart();
    this.createOrderStatusChart();
  }

  createCategoryChart(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (!ctx || !this.analytics?.categoryWiseSales) return;

    const labels = this.analytics.categoryWiseSales.map((c: any) => c.categoryName);
    const data = this.analytics.categoryWiseSales.map((c: any) => c.totalRevenue);

    this.categoryChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#667eea',
            '#11998e',
            '#f093fb',
            '#4facfe',
            '#43e97b',
            '#fa709a'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: { size: 12 }
            }
          }
        }
      }
    });
  }

  createTopProductsChart(): void {
    const ctx = document.getElementById('topProductsChart') as HTMLCanvasElement;
    if (!ctx || !this.analytics?.topSellingGifts) return;

    const labels = this.analytics.topSellingGifts.map((g: any) => g.name);
    const data = this.analytics.topSellingGifts.map((g: any) => g.totalQuantity);

    this.topProductsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Units Sold',
          data: data,
          backgroundColor: 'rgba(102, 126, 234, 0.8)',
          borderColor: 'rgba(102, 126, 234, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  createOrderStatusChart(): void {
    const ctx = document.getElementById('orderStatusChart') as HTMLCanvasElement;
    if (!ctx || !this.analytics?.ordersByStatus) return;

    const labels = this.analytics.ordersByStatus.map((s: any) => s._id);
    const data = this.analytics.ordersByStatus.map((s: any) => s.count);

    this.orderStatusChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#f093fb',
            '#4facfe',
            '#43e97b',
            '#11998e',
            '#eb3349'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: { size: 12 }
            }
          }
        }
      }
    });
  }
}
