import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { ShwittComponent} from './shwittes/shwitt/shwitt.component';
import {ShwittesComponent} from './shwittes/shwittes.component';

const routes: Routes = [
  { path: 'shwittes', component: ShwittesComponent, children: [{
    path: ':id', component: ShwittComponent}]},

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShwittRoutingModule {
}
