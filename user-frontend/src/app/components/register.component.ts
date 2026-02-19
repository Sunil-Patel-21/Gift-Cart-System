import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <div class="register-box">
        <h2>User Registration</h2>
        <form (ngSubmit)="onRegister()">
          <div class="form-group">
            <label>Name</label>
            <input type="text" [(ngModel)]="user.name" name="name" required class="form-control">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="user.email" name="email" required class="form-control">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" [(ngModel)]="user.password" name="password" required class="form-control">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="text" [(ngModel)]="user.phone" name="phone" class="form-control">
          </div>
          <div *ngIf="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-primary">Register</button>
          <p>Already have an account? <a routerLink="/login">Login here</a></p>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', phone: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Registration failed';
      }
    });
  }
}
