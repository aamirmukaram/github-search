import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReposComponent } from './repos.component';
import { ReposService } from './repos.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let reposServiceMock: any;

  beforeEach(async () => {
    reposServiceMock = {
      searchRepositories: jest.fn().mockReturnValue(of({
        items: [
          { name: 'Angular', avatarUrl: 'http://example.com/avatar', creationDate: '2020-01-01' }
        ],
        totalCount: 1
      })),
      searchRepositoriesByIssueTitle: jest.fn().mockReturnValue(of({
        items: [
          { name: 'Angular', avatarUrl: 'http://example.com/avatar', creationDate: '2020-01-01' }
        ],
        totalCount: 1
      }))
    };

    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ReposComponent
      ],
      providers: [
        { provide: ReposService, useValue: reposServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
