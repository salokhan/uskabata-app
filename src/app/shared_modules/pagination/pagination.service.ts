import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  pageSize = 12;
  startPage;
  endPage;
  startIndex = 0;
  endIndex = this.pageSize - 1;
  currentPage = 1;
  totalPages = 0;
  totalItems = 0;
  pages: any[];
  pagedResults: any[];
  dataSource: any[];

  constructor() { }

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
    this.pagedResults = this.dataSource.slice(this.startIndex, this.endIndex + 1);
  }

}
