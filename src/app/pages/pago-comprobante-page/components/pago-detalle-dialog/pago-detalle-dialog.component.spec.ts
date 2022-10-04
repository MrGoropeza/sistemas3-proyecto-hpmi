import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDetalleDialogComponent } from './pago-detalle-dialog.component';

describe('PagoDetalleDialogComponent', () => {
  let component: PagoDetalleDialogComponent;
  let fixture: ComponentFixture<PagoDetalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoDetalleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
