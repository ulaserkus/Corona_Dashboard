/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PercantageService } from './percantage.service';

describe('Service: Percantage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PercantageService]
    });
  });

  it('should ...', inject([PercantageService], (service: PercantageService) => {
    expect(service).toBeTruthy();
  }));
});
