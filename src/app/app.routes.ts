import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AtivateAccountComponent } from './pages/ativate-account/ativate-account.component';
import { authGuard } from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'activate-account',
    component: AtivateAccountComponent,
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./modules/book/book-routing.module').then((m) => m.bookRoutes),
    canActivate: [authGuard],
  },
];
