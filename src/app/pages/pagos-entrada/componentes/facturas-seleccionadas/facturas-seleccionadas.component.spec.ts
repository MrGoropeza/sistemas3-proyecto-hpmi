import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasSeleccionadasComponent } from './facturas-seleccionadas.component';

describe('FacturasSeleccionadasComponent', () => {
  let component: FacturasSeleccionadasComponent;
  let fixture: ComponentFixture<FacturasSeleccionadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasSeleccionadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasSeleccionadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
