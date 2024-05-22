import { TestBed } from '@angular/core/testing';

import { SearchCommitService } from './search-commit.service';

describe('SearchCommitService', () => {
  let service: SearchCommitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCommitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
