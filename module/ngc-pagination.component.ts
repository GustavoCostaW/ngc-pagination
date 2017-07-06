import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngc-pagination',
  template: `
    <div id="exibition">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ngc-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgcPaginationComponent {
  @Output() public pageChanged;
  private config;
  private pagination;
  private pageState;

  constructor() {
    this.pageChanged = new EventEmitter();
    this.pageState = 'start';

    this.config = {
      totalItens: 500,
      itensPerPage: 5,
      currentPage: 1,
      range: 11,
      change_after: false,
    }

    this.config.totalPages = this.config.totalItens < this.config.itensPerPage ? 1 : Math.round(this.config.totalItens / this.config.itensPerPage);
    this.createPagination();
    this.createExibition();
  }

  public goTo(e, page) {

    let temp_current_page = this.config.currentPage;

    switch(e) {
      case "firstPage":
        temp_current_page = 1;
      break;
      case "lastPage":
        temp_current_page= this.config.totalPages;
      break;
      case "prevPage":
        temp_current_page--;
      break;
      case "nextPage":
        temp_current_page++;
      break;
      default:
        temp_current_page = page;
    }

    if(!this.config.change_after) {
      this.config.currentPage = temp_current_page;
    }

    this.createExibition();
    this.pageChanged.emit({goTo: temp_current_page, e: e});
  }

  private createPagination() {
    this.config.pagination = [];

    for(let i = 0;i < this.config.totalPages; i++) {
      this.config.pagination.push(i+1);
    }
  }

  private createExibition() {
    let start = Math.floor((this.config.currentPage-1) - this.config.range/2 < 0 ? 0 : this.config.currentPage-this.config.range/2);
    let end = Math.floor(this.config.currentPage < this.config.range/2 ? this.config.range : (this.config.currentPage) + this.config.range/2);

    let diff = end - this.config.pagination.length;
    if( diff > 0) {
      end -= diff;
      start -= diff;
    }

    this.config.exibition = this.config.pagination.slice(start, end);
  }
}