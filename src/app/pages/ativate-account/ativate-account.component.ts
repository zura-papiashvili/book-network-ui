import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ativate-account',
  standalone: true,
  imports: [CommonModule, CodeInputModule, FormsModule],
  templateUrl: './ativate-account.component.html',
  styleUrls: ['./ativate-account.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AtivateAccountComponent {
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  onCodeComplete(token: string): void {
    this.confirmAccount(token);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({ token }).subscribe({
      next: () => {
        this.submitted = true;
        this.isOkay = true;
        this.message = 'Account activated successfully';
      },
      error: (err) => {
        this.isOkay = false;
        this.message = 'your token is expired or invalid';
        this.submitted = true;
      },
    });
  }
}
