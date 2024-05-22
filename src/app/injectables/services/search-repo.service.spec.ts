import { TestBed } from '@angular/core/testing';

import { SearchRepoService } from './search-repo.service';

describe('SearchRepoService', () => {
  let service: SearchRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
