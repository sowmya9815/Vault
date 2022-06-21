import { TestBed } from '@angular/core/testing';

import { LogauthService } from './logauth.service';

describe('LogerService', () => {
  let service: LogauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
