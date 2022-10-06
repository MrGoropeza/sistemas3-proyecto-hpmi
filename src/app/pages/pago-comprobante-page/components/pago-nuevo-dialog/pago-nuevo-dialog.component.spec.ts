import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoNuevoDialogComponent } from './pago-nuevo-dialog.component';

describe('PagoNuevoDialogComponent', () => {
  let component: PagoNuevoDialogComponent;
  let fixture: ComponentFixture<PagoNuevoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoNuevoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoNuevoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
