import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';

export class NgcPaginationModel {
  totalItens: number;
  itensPerPage?: number;
  currentPage?: number;
  range?: number;
  change_after?: boolean;
  totalPages? :number;
  pagination?: number[];
  exibition? : number[];
}

@Component({
  selector: 'ngc-pagination',
  template: `
    <div id="exibition">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ngc-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgcPaginationComponent implements OnInit {
  @Output() public paginationEvents: EventEmitter<any>;
  @Input() public config: BehaviorSubject<NgcPaginationModel>;

  constructor(private cd: ChangeDetectorRef) {
    this.paginationEvents = new EventEmitter();
  }

  ngOnInit() {
    this.config.subscribe( v => {

      this.useDefaultValues();
      this.createPagination();
      this.createExibition();
      this.cd.markForCheck();
    });
  }

  private useDefaultValues() {
    if(!this.config.getValue().currentPage) {
      this.config.getValue().currentPage = 1;
    }

    if(!this.config.getValue().range) {
      this.config.getValue().range = 10;
    }

    if(!this.config.getValue().itensPerPage) {
      this.config.getValue().itensPerPage = 10;
    }

    if(this.config.getValue().change_after === undefined) {
      this.config.getValue().change_after = false;
    }
  }

  public goTo(e, page) {

    let temp_current_page = this.config.getValue().currentPage;

    switch(e) {
      case "firstPage":
        temp_current_page = 1;
      break;
      case "lastPage":
        temp_current_page = this.config.getValue().totalPages;
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

    if(!this.config.getValue().change_after) {
      this.config.getValue().currentPage = temp_current_page;
      this.createExibition();
    }

    this.paginationEvents.emit({goTo: temp_current_page, e: e});
  }

  private createPagination() {
    this.config.getValue().totalPages = this.config.getValue().totalItens < this.config.getValue().itensPerPage ? 1 : Math.round(this.config.getValue().totalItens / this.config.getValue().itensPerPage);
    this.config.getValue().pagination = [];

    for(let i = 0;i < this.config.getValue().totalPages; i++) {
      this.config.getValue().pagination.push(i+1);
    }
  }

  private createExibition() {

    let start = Math.floor((this.config.getValue().currentPage-1) - this.config.getValue().range/2 < 0 ? 0 : this.config.getValue().currentPage-this.config.getValue().range/2);
    let end = Math.floor(this.config.getValue().currentPage < this.config.getValue().range/2 ? this.config.getValue().range : (this.config.getValue().currentPage) + this.config.getValue().range/2);

    let diff = end - this.config.getValue().pagination.length;
    if( diff > 0) {
      end -= diff;
      start -= diff;
    }

    this.config.getValue().exibition = this.config.getValue().pagination.slice(start, end);
  }
}