import { TestBed } from '@angular/core/testing';

import { ReposService } from './repos.service';

describe('SearchRepoService', () => {
  let service: ReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
