import { TestBed } from '@angular/core/testing';

import { VeichuleService } from './veichule.service';

describe('VeichuleService', () => {
  let service: VeichuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeichuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
