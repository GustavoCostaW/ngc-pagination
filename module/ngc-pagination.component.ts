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
  disabledWhenChange?: boolean;
}

@Component({
  selector: 'ngc-pagination',
  template: `
    <div id="exibition">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`

  #exibition {
    display: flex;
  }

  :host /deep/ .page.active {
      background: #4285F4;
      color:white;
      box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
  }
  :host /deep/ .page {
      color: #0275d8;
      background-color: #fff;
      cursor: pointer;
      color:black;
      width:33px;
      height: 33px;
      border-radius: 2px;
      padding: 0px;
  }

  :host /deep/ button {
      min-width: 33px;
      min-height: 33px;
      padding: 0px;
  }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgcPaginationComponent implements OnInit {
  @Output() public paginationEvents: EventEmitter<any>;
  @Input() public config: BehaviorSubject<NgcPaginationModel>;
  private buttonsDisabled: boolean;

  constructor(private cd: ChangeDetectorRef) {
    this.paginationEvents = new EventEmitter();
    this.buttonsDisabled = false;
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
    if (!this.config.getValue().currentPage) {
      this.config.getValue().currentPage = 1;
    }

    if (!this.config.getValue().range) {
      this.config.getValue().range = 10;
    }

    if (!this.config.getValue().itensPerPage) {
      this.config.getValue().itensPerPage = 10;
    }

    if (this.config.getValue().change_after === undefined) {
      this.config.getValue().change_after = false;
    }

    if (this.config.getValue().disabledWhenChange === undefined) {
      this.config.getValue().disabledWhenChange = false;
    }

    else {
      this.buttonsDisabled = false;
    }
  }

  public goTo(e, page) {

    let temp_current_page = this.config.getValue().currentPage;

    switch (e) {
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

    if (!this.config.getValue().change_after) {
      this.config.getValue().currentPage = temp_current_page;
      this.createExibition();
    }

    if (this.config.getValue().disabledWhenChange === true) {
      this.buttonsDisabled = true;
    }

    this.paginationEvents.emit({goTo: temp_current_page, event: e});
  }

  private createPagination() {
    this.config.getValue().totalPages = this.config.getValue().totalItens < this.config.getValue().itensPerPage ? 1 : Math.ceil(this.config.getValue().totalItens / this.config.getValue().itensPerPage);
    this.config.getValue().pagination = [];

    for (let i = 0; i < this.config.getValue().totalPages; i++) {
      this.config.getValue().pagination.push(i+1);
    }
  }

  private createExibition() {
    let start = Math.ceil((this.config.getValue().currentPage-1) - this.config.getValue().range/2 < 0 ? 0 : (this.config.getValue().currentPage - 1) -this.config.getValue().range/2);
    let end = Math.ceil(this.config.getValue().currentPage <= this.config.getValue().range/2 ? this.config.getValue().range+1 : (this.config.getValue().currentPage) + (this.config.getValue().range/2));

    let diff = end - this.config.getValue().pagination.length;
    if (diff > 0) {
      let startCount = this.config.getValue().pagination.length - this.config.getValue().range -1;
      start = startCount < 0 ? 0 : startCount;
      end -= diff;
    }

    this.config.getValue().exibition = this.config.getValue().pagination.slice(start, end);
  }
}