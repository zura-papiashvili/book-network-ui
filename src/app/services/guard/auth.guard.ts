import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token/token.service';

export const authGuard: CanActivateFn = () => {
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);
  if (tokenService.isTokenNotValid()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
