import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEntradaDetalleDialogComponent } from './pago-entrada-detalle-dialog.component';

describe('PagoEntradaDetalleDialogComponent', () => {
  let component: PagoEntradaDetalleDialogComponent;
  let fixture: ComponentFixture<PagoEntradaDetalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoEntradaDetalleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoEntradaDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
