import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FilterModule } from '../../shared_modules/filter/filter.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FilterModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
