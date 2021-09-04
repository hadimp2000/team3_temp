import { TestBed } from '@angular/core/testing';

import { SendRequestServiceService } from './send-request-service.service';

describe('SendRequestServiceService', () => {
  let service: SendRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
