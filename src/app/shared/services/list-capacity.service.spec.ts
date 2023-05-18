import { TestBed } from '@angular/core/testing';

import { ListCapacityService } from './list-capacity.service';

describe('ListCapacityService', () => {
  let service: ListCapacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
