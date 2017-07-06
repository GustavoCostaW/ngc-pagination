import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcPaginationComponent } from './ngc-pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgcPaginationComponent],
  exports:[NgcPaginationComponent]
})
export class NgcPaginationModule { }