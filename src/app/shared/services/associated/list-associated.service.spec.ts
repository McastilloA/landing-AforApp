import { TestBed } from '@angular/core/testing';

import { ListAssociatedService } from './list-associated.service';

describe('ListAssociatedService', () => {
  let service: ListAssociatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAssociatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
