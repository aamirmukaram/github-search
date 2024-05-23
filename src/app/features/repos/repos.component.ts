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
import { OnInit } from '@angular/core';
import { SearchRepositoriesRequest } from './repos.service';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [MatInputModule, MatTableModule, MatPaginatorModule, MatCardModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.scss'
})
export class ReposComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private reposService = inject(ReposService);
  private formBuilder = inject(FormBuilder);
  displayedColumns: string[] = ['avatarUrl', 'name', 'creationDate'];
  dataSource: SearchRepositry[] = [];
  totalCount = 0;
  pageSize = 30;
  searchForm!: FormGroup;

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
      language: [''],
      minStars: ['']
    });
  }

  searchButtonClicked() {
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
    this.fetchTableData(request);
  }

  private fetchTableData(request: SearchRepositoriesRequest) {
    this.reposService.searchRepositories(request)
      .subscribe(repos => {
        this.totalCount = repos.totalCount;
        this.dataSource = repos.items;
      });
  }

  pageChanged() {
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
    this.fetchTableData(request);
  }
}
