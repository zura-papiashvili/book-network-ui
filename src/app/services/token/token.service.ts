import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isExpired = jwtHelper.isTokenExpired(token);
    if (isExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }
}
