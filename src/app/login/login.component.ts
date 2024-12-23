import { Component } from '@angular/core';
import { AuthenticationRequest } from '../services/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  register() {
    throw new Error('Method not implemented.');
  }
  login() {
    throw new Error('Method not implemented.');
  }
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];
}
