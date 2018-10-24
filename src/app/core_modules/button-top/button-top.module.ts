import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonTopComponent } from './button-top/button-top.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonTopComponent],
  exports: [ButtonTopComponent]
})
export class ButtonTopModule { }
