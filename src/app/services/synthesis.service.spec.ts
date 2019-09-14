import { TestBed } from '@angular/core/testing';

import { SynthesisService } from './synthesis.service';

describe('SynthesisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SynthesisService = TestBed.get(SynthesisService);
    expect(service).toBeTruthy();
  });
});
