import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { httpTokenInterceptor } from './services/interceptor/http-token.interceptor.spec';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    HttpClient,
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
  ],
};
