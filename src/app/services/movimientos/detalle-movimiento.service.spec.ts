import { TestBed } from '@angular/core/testing';

import { DetalleMovimientoService } from './detalle-movimiento.service';

describe('DetalleMovimientoService', () => {
  let service: DetalleMovimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleMovimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
