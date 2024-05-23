import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommitsComponent } from './commits.component';
import { CommitsService } from './commits.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;
  let commitsServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    commitsServiceMock = {
      listCommits: jest.fn().mockReturnValue(of({
        items: [
          { name: 'John Doe', url: 'http://example.com', message: 'Initial commit' }
        ],
        totalCount: 1
      }))
    };

    activatedRouteMock = {
      snapshot: {
        params: {
          owner: 'angular',
          repo: 'angular'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        CommitsComponent,
        FormsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CommitsService, useValue: commitsServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
