import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: {
    username: string;
    name: string;
    role?: string;
  };
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          if (response.success && response.user) {
            // Store user data
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            if (response.token) {
              localStorage.setItem('authToken', response.token);
            }
            this.currentUserSubject.next(response.user);
          }
          return response;
        }),
        catchError(error => {
          console.error('Login error:', error);
          // Return mock response for demo
          return of(this.getMockLoginResponse(credentials));
        })
      );
  }

  logout(): void {
    // Clear stored data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // Mock login response for demo purposes
  private getMockLoginResponse(credentials: LoginCredentials): AuthResponse {
    // Simulate API delay
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return {
        success: true,
        user: {
          username: 'AE04085',
          name: 'João Silva',
          role: 'Operator'
        },
        token: 'mock-jwt-token-12345'
      };
    } else if (credentials.username === 'user' && credentials.password === 'user') {
      return {
        success: true,
        user: {
          username: 'AE04086',
          name: 'Maria Santos',
          role: 'Operator'
        },
        token: 'mock-jwt-token-67890'
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password'
      };
    }
  }
}
