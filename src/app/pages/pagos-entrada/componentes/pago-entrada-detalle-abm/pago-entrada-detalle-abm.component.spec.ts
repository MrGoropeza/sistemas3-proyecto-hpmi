import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEntradaDetalleABMComponent } from './pago-entrada-detalle-abm.component';

describe('PagoEntradaDetalleABMComponent', () => {
  let component: PagoEntradaDetalleABMComponent;
  let fixture: ComponentFixture<PagoEntradaDetalleABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoEntradaDetalleABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoEntradaDetalleABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
