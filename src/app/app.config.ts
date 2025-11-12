import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
/* import { providePrimeNG } from 'primeng/config'; */
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import Lara from '@primeng/themes/lara';


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimationsAsync(),
   /*  providePrimeNG({ 
            theme: {
                preset: Lara,
                 options: {
                    prefix: 'p',
                    darkModeSelector: 'false',
                    cssLayer: false
                }
            }
        }), */
    provideHttpClient(), provideAnimationsAsync()
  ]
};
