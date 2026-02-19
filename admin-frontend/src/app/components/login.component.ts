import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>Admin Login</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Email</label>
            <input [(ngModel)]="credentials.email" name="email" type="email" required class="form-control">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input [(ngModel)]="credentials.password" name="password" type="password" required class="form-control">
          </div>
          <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (response) => {
        if (response.success && response.data.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Access denied. Admin only.';
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Login failed';
      }
    });
  }
}
