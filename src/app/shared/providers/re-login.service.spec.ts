import { TestBed, inject } from '@angular/core/testing';

import { ReLoginService } from './re-login.service';

describe('ReLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReLoginService]
    });
  });

  it('should be created', inject([ReLoginService], (service: ReLoginService) => {
    expect(service).toBeTruthy();
  }));
});
