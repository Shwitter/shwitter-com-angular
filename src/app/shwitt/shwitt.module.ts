import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShwittesComponent } from './shwittes/shwittes.component';
import { ShwittComponent } from './shwittes/shwitt/shwitt.component';
import { ShwittRoutingModule } from './shwitt-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ShwittInterceptorService} from "./shwittService/shwitt-interceptor.service";


@NgModule({
  declarations: [ShwittesComponent, ShwittComponent],
  imports: [
    CommonModule,
    ShwittRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ShwittesComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShwittInterceptorService,
      multi: true
    }
  ]
})
export class ShwittModule { }
