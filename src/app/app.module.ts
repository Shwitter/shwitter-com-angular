import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
