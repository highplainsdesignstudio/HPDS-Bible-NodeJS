import { TestBed, inject } from '@angular/core/testing';

import { GetbibleService } from './getbible.service';

describe('GetbibleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetbibleService]
    });
  });

  it('should be created', inject([GetbibleService], (service: GetbibleService) => {
    expect(service).toBeTruthy();
  }));
});
