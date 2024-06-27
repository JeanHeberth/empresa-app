import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {Departamento} from "./classes/departamento";
import {provideHttpClient} from "@angular/common/http";
import { routes } from './app.routes';
import {Endereco} from "./classes/endereco";



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    Departamento,
    Endereco
  ]
};
