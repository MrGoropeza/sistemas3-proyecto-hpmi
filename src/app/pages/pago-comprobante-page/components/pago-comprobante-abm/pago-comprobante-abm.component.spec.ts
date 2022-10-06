import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoComprobanteABMComponent } from './pago-comprobante-abm.component';

describe('PagoComprobanteABMComponent', () => {
  let component: PagoComprobanteABMComponent;
  let fixture: ComponentFixture<PagoComprobanteABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComprobanteABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComprobanteABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
