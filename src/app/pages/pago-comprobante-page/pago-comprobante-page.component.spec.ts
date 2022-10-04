import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoComprobantePageComponent } from './pago-comprobante-page.component';

describe('PagoComprobantePageComponent', () => {
  let component: PagoComprobantePageComponent;
  let fixture: ComponentFixture<PagoComprobantePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComprobantePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComprobantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
