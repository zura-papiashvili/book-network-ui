import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  };
  errorMsg: Array<string> = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  login() {
    this.router.navigate(['/login']);
  }
  register() {
    this.errorMsg = [];
    this.authService.register({ body: this.registerRequest }).subscribe({
      next: () => {
        this.router.navigate(['/activate-account']);
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      },
    });
  }
}
