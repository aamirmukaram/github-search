import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommitsService, SearchCommit, SearchCommitsRequest } from './commits.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

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
  private activatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['name', 'url', 'message'];
  dataSource: SearchCommit[] = []; 
  totalCount = 0;
  pageSize = 30;
  private urlParams = this.activatedRoute.snapshot.params;

  fetchTableData(request: SearchCommitsRequest) {
    this.commitsService.searchCommits(request)
      .subscribe(commits => {
        this.totalCount = commits.totalCount;
        this.dataSource = commits.items;
      });
  }

  ngAfterViewInit() {
    this.fetchTableData({
      searchTerm: 'angular',
      owner: this.urlParams['owner'],
      repo: this.urlParams['repo'],
      page: 1,
      perPage: this.pageSize
    });
  }

  pageChanged(event: PageEvent) {
    this.fetchTableData({
      searchTerm: 'angular',
      owner: this.urlParams['owner'],
      repo: this.urlParams['repo'],
      page: event.pageIndex + 1,
      perPage: event.pageSize
    });
  }
}
