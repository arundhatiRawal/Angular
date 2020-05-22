import { TestBed } from '@angular/core/testing';

import { ChartDisplayService } from './chart-display.service';

describe('ChartDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartDisplayService = TestBed.get(ChartDisplayService);
    expect(service).toBeTruthy();
  });
});
