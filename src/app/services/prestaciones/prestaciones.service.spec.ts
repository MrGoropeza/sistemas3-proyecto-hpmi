import { TestBed } from '@angular/core/testing';

import { PrestacionesService } from './prestaciones.service';

describe('PrestacionesService', () => {
  let service: PrestacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
