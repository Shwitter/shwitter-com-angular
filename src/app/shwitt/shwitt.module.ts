import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShwittesComponent } from './shwittes/shwittes.component';
import { ShwittComponent } from './shwittes/shwitt/shwitt.component';
import { ShwittRoutingModule } from './shwitt-routing.module';


@NgModule({
  declarations: [ShwittesComponent, ShwittComponent],
  imports: [
    CommonModule,
    ShwittRoutingModule
  ]
})
export class ShwittModule { }
