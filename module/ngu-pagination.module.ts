import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguPaginationComponent } from './ngu-pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NguPaginationComponent],
  exports:[NguPaginationComponent]
})
export class NguPaginationModule { }