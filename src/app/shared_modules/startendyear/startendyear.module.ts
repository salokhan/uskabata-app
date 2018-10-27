import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartendyearComponent } from './startendyear/startendyear.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [StartendyearComponent],
  exports: [StartendyearComponent]
})
export class StartendyearModule { }
