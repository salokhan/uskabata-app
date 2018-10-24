import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopBarModule } from './core_modules/top-bar/top-bar.module';
import { AppRoutingModule } from './app-routing.module';
import { ButtonTopModule } from './core_modules/button-top/button-top.module';
import { GenericFunctionsService } from './shared_modules/generic-functions-service';


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
  providers: [
    GenericFunctionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
