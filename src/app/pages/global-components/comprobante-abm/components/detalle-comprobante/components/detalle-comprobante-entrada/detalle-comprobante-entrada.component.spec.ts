import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComprobanteEntradaComponent } from './detalle-comprobante-entrada.component';

describe('DetalleComprobanteEntradaComponent', () => {
  let component: DetalleComprobanteEntradaComponent;
  let fixture: ComponentFixture<DetalleComprobanteEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleComprobanteEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleComprobanteEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
