import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommitsService, SearchCommit, SearchCommitsRequest } from './commits.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
  providers: [CommitsService]
})
export class CommitsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private commitsService = inject(CommitsService);
  displayedColumns: string[] = ['name', 'url', 'message'];
  dataSource = new MatTableDataSource<SearchCommit>();
  totalCount = 0;
  pageSize = 30;

  constructor() {

  }

  fetchTableData(request: SearchCommitsRequest) {
    this.commitsService.searchCommits(request)
      .subscribe(commits => {
        this.dataSource.data = commits.items;
        this.totalCount = commits.totalCount;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.fetchTableData({
      searchTerm: 'angular',
      owner: 'angular',
      repo: 'angular',
      page: 1,
      perPage: this.pageSize
    });
  }

  pageChanged(event: PageEvent) {
    this.fetchTableData({
      searchTerm: 'angular',
      owner: 'angular',
      repo: 'angular',
      page: event.pageIndex + 1,
      perPage: event.pageSize
    });
  }
}
