import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopBarModule } from './core_modules/top-bar/top-bar.module';
import { AppRoutingModule } from './app-routing.module';
import { ButtonTopModule } from './core_modules/button-top/button-top.module';
import { ButtonTopComponent } from './core_modules/button-top/button-top/button-top.component';
import { ButtonTopService } from './core_modules/button-top/service-button-top/button-top.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    TopBarModule,
    ButtonTopModule
  ],
  entryComponents: [ButtonTopComponent],
  providers: [
    ButtonTopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
