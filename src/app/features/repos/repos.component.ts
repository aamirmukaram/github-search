import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { ReposService } from './repos.service';
import { SearchRepositry } from './repos.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SearchRepositoriesRequest } from './repos.service';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SearchRepositoriesByIssueTitleRequest } from './repos.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [DatePipe, MatInputModule, MatTableModule, MatPaginatorModule, MatCardModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.scss'
})
export class ReposComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private reposService = inject(ReposService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  displayedColumns: string[] = ['avatarUrl', 'name', 'creationDate'];
  dataSource: SearchRepositry[] = [];
  totalCount = 0;
  pageSize = 30;
  searchForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    language: [''],
    minStars: ['']
  });
  searchRepositoriesByIssueTitle = false;

  searchByIssueTitleForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  searchByIssueTitleButtonClicked() {
    this.searchRepositoriesByIssueTitle = true;
    const formValue = this.searchByIssueTitleForm.value;
    const name = formValue['name'];

    if (!name) {
      return;
    }
    this.fetchReposByIssueTitleData({ name, page: 1, perPage: this.paginator.pageSize });
  }

  searchButtonClicked() {
    this.searchRepositoriesByIssueTitle = false;
    const formValue = this.searchForm.value;
    const name = formValue['name'];
    const language = formValue['language'];
    const minStars = formValue['minStars'];
    const request: SearchRepositoriesRequest = { name: '', page: 1, perPage: this.paginator.pageSize };

    if (!name) {
      return;
    }
    request['name'] = name;

    if (language) {
      request['language'] = language;
    }

    if (minStars) {
      request['minStars'] = minStars;
    }
    this.fetchReposData(request);
  }

  private fetchReposData(request: SearchRepositoriesRequest) {
    this.reposService.searchRepositories(request)
      .subscribe(repos => {
        this.totalCount = repos.totalCount;
        this.dataSource = repos.items;
      });
  }

  private fetchReposByIssueTitleData(request: SearchRepositoriesByIssueTitleRequest) {
    this.reposService.searchRepositoriesByIssueTitle(request)
      .subscribe(repos => {
        this.totalCount = repos.totalCount;
        this.dataSource = repos.items;
      });
  }

  pageChanged() {
    if (this.searchRepositoriesByIssueTitle) {
      const formValue = this.searchByIssueTitleForm.value;
      const name = formValue['name'];
  
      if (!name) {
        return;
      }
      this.fetchReposByIssueTitleData({ name, page: this.paginator.pageIndex + 1, perPage: this.paginator.pageSize });
      return;
    }
    const formValue = this.searchForm.value;
    const name = formValue['name'];
    const language = formValue['language'];
    const minStars = formValue['minStars'];
    const request: SearchRepositoriesRequest = { name: '', page: this.paginator.pageIndex + 1, perPage: this.paginator.pageSize };

    if (!name) {
      return;
    }
    request['name'] = name;

    if (language) {
      request['language'] = language;
    }

    if (minStars) {
      request['minStars'] = minStars;
    }
    this.fetchReposData(request);
  }

  tableRowClicked(row: SearchRepositry) {
    this.router.navigate(['/commits', row.owner, row.repo]);
  }
}
