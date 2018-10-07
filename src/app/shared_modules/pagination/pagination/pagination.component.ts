import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges, OnInit {

  @Input() results: any[];
  pagedResults: any[];
  @Output() paginationClicked: EventEmitter<any[]> = new EventEmitter<any[]>();


  pageSize = 12;
  startPage;
  endPage;
  startIndex = 0;
  endIndex = this.pageSize - 1;
  currentPage = 1;
  totalPages = 0;
  totalItems = 0;
  pages: any[];
  errorMessage;

  constructor() {
  }

  ngOnChanges() {
    if (this.results) {
      this.totalItems = this.results.length;
      this.pagination();
      this.paginationClicked.emit(this.pagedResults);
    }
  }

  ngOnInit() {
  }

  setPage(pageNumber): void {
    this.currentPage = pageNumber;
    this.pagination();
  }

  pagination() {
    // calculate total pages
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    // ensure current page isn't out of range
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    if (this.totalPages <= this.pageSize) {
      // less than 10 total pages so show all
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (this.currentPage <= 6) {
        this.startPage = 1;
        this.endPage = this.pageSize;
      } else if (this.currentPage + 4 >= this.totalPages) {
        this.startPage = this.totalPages - 9;
        this.endPage = this.totalPages;
      } else {
        this.startPage = this.currentPage - 5;
        this.endPage = this.currentPage + 4;
      }
    }

    // calculate start and end item indexes
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize - 1, this.totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    this.pages = Array.from(Array((this.endPage + 1) - this.startPage).keys()).map(i => this.startPage + i);

    // populate the pagged array/results
    this.pagedResults = this.results.slice(this.startIndex, this.endIndex + 1);

    this.paginationClicked.emit(this.pagedResults);
  }


}
