import { TestBed } from '@angular/core/testing';

import { ArticuloDeDepositoService } from './articulo-de-deposito.service';

describe('ArticuloDeDepositoService', () => {
  let service: ArticuloDeDepositoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticuloDeDepositoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
