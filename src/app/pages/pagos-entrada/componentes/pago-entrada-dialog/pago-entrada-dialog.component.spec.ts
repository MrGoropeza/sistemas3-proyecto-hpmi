import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEntradaDialogComponent } from './pago-entrada-dialog.component';

describe('PagoEntradaDialogComponent', () => {
  let component: PagoEntradaDialogComponent;
  let fixture: ComponentFixture<PagoEntradaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoEntradaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoEntradaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
