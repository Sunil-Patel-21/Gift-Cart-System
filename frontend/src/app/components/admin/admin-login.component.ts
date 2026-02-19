import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (response) => {
        if (response.success && response.data.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
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
