import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarFacturaComponent } from './seleccionar-factura.component';

describe('SeleccionarFacturaComponent', () => {
  let component: SeleccionarFacturaComponent;
  let fixture: ComponentFixture<SeleccionarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
