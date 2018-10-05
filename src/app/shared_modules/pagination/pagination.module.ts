import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from './pagination.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaginationComponent],
  providers: [PaginationService],
  exports: [PaginationComponent]
})
export class PaginationModule { }
