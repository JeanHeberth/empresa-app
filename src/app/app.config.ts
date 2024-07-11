import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {Departamento} from "./classes/departamento";
import {provideHttpClient} from "@angular/common/http";
import {routes} from './app.routes';
import {Endereco} from "./classes/endereco";
import {NgxMaskDirective, provideEnvironmentNgxMask} from "ngx-mask";
import {CustomCurrencyMaskConfig} from "./empresa/orcamento-form/orcamento-form.component";
import {CURRENCY_MASK_CONFIG} from "ng2-currency-mask";
import {DatePipe} from "@angular/common";




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    Departamento,
    NgxMaskDirective,
    DatePipe,
    Endereco,
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    }]
}


