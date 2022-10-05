import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoComprobantesASeleccionarABMComponent } from './pago-comprobantes-aseleccionar-abm.component';

describe('PagoComprobantesASeleccionarABMComponent', () => {
  let component: PagoComprobantesASeleccionarABMComponent;
  let fixture: ComponentFixture<PagoComprobantesASeleccionarABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComprobantesASeleccionarABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComprobantesASeleccionarABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
