import { TestBed } from '@angular/core/testing';
import { CommitsService } from './commits.service';

describe('CommitsService', () => {
  let service: CommitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommitsService],
    });
    service = TestBed.inject(CommitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
