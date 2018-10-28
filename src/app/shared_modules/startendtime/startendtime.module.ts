import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartendtimeComponent } from './startendtime/startendtime.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [StartendtimeComponent],
  exports: [StartendtimeComponent]

})
export class StartendtimeModule { }
