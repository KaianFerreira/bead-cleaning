import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  credentials: LoginCredentials = {
    login: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.credentials.login || !this.credentials.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await this.authService.login(this.credentials)
      this.isLoading = false;
      if (response) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Login failed'; 
      }
    } catch (error) {
      this.isLoading = false;
      if (error instanceof Error && 'status' in error) {
        const httpError = error as any;
        if (httpError.status === 401) {
          this.errorMessage = 'Invalid credentials';
        } else if (httpError.status === 400) {
          this.errorMessage = 'Internal error';
        } else {
          this.errorMessage = 'Connection error. Please try again.';
        }
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
