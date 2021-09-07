import { TestBed } from '@angular/core/testing';

import { DataSetServiceService } from './data-set-service.service';

describe('DataSetServiceService', () => {
  let service: DataSetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
