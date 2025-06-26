import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { api, setBearerToken as apiSetAuth } from '../app/api/axios';

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: {
    username: string;
    name: string;
  };
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  constructor() {
    // Initialize with stored user data if available
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    // Check if user is already logged in
    this.checkUser()
  }

  decodeBearerToken = (token: string): any => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  async checkUser() {
    try {
      const { data } = await api.get('/auth/check-logon');
      const user = this.decodeBearerToken(data.bearer_token);
      if (user) {
        // Store user data
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', JSON.stringify(data.bearer_token));
        apiSetAuth(data.bearer_token);
        this.setCurrentUser(user);
      } else {
        this.logout();
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
          const user = this.decodeBearerToken(storedToken);
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            apiSetAuth(storedToken);
            this.setCurrentUser(user);
          } else {
            this.logout();
          }
        } else {
          this.logout();
        }
      }
      console.error('Error checking user:', error);
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {

    const { data } = await api.post(`/auth/login`, credentials)

    if (data.message === 'Login successful' && data.bearer_token) {
      // Store user data
      localStorage.setItem('authToken', data.bearer_token);
      apiSetAuth(data.bearer_token);
      const user = this.decodeBearerToken(data.bearer_token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.setCurrentUser(user);
    }
    return true;
  }

  logout(): void {
    // Clear stored data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    // Clear user data
    this.setCurrentUser(null);
    // Clear API authentication
    apiSetAuth('');
    // Redirect to login page
    // Check if not already on login page
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  getCurrentUser$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
  isLoggedIn(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && !!user.logon_username;
  }
}
