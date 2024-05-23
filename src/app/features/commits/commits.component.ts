import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommitsService, SearchCommit, SearchCommitsRequest } from './commits.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatCardModule],
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
  urlParams = this.activatedRoute.snapshot.params;
  searchTerm = 'angular'

  private fetchTableData(request: SearchCommitsRequest) {
    this.commitsService.listCommits(request)
      .subscribe(commits => {
        this.totalCount = commits.totalCount;
        this.dataSource = commits.items;
      });
  }

  ngAfterViewInit() {
    this.fetchTableData({
      searchTerm: this.searchTerm || 'angular',
      owner: this.urlParams['owner'],
      repo: this.urlParams['repo'],
      page: 1,
      perPage: this.pageSize
    });
  }

  pageChanged() {
    this.fetchTableData({
      searchTerm: this.searchTerm || 'angular',
      owner: this.urlParams['owner'],
      repo: this.urlParams['repo'],
      page: this.paginator.pageIndex + 1,
      perPage: this.paginator.pageSize
    });
  }
}
