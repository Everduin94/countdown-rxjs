import { TestBed } from '@angular/core/testing';

import { ContentfulService } from './contentful.service';

describe('ContentfulService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentfulService = TestBed.get(ContentfulService);
    expect(service).toBeTruthy();
  });
});
