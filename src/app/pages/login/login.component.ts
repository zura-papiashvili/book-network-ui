import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}
  register() {
    this.router.navigate(['/register']);
  }
  login() {
    this.errorMsg = [];
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (response) => {
        this.tokenService.token = response.token as string;
        this.router.navigate(['/books']);
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      },
    });
  }
}
