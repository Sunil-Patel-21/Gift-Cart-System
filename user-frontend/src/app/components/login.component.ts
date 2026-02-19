import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>User Login</h2>
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" required class="form-control">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" required class="form-control">
          </div>
          <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-primary">Login</button>
          <p>Don't have an account? <a routerLink="/register">Register here</a></p>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Login failed';
      }
    });
  }
}
