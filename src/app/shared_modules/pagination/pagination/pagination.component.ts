import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges, OnInit {

  @Input() results: any[];
  pagedResults: any[];
  @Output() paginationClicked: EventEmitter<any[]> = new EventEmitter<any[]>();


  pageSize;
  currentPage;
  totalPages;
  pages: any[];

  constructor(public _paginationService: PaginationService) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    if (this._paginationService.dataSource && this._paginationService.dataSource.length > 0) {
      this._paginationService.pagination();
      this.currentPage = this._paginationService.currentPage;
      this.pageSize = this._paginationService.pageSize;
      this.totalPages = this._paginationService.totalPages;
      this.pages = this._paginationService.pages;
    }
  }

  setPage(pageNumber): void {
    this.currentPage = pageNumber;
    this._paginationService.currentPage = pageNumber;
    this._paginationService.pagination();
    this.totalPages = this._paginationService.totalPages;
    this.pages = this._paginationService.pages;
  }

}
