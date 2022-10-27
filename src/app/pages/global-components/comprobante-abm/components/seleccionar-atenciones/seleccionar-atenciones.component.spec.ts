import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarAtencionesComponent } from './seleccionar-atenciones.component';

describe('SeleccionarAtencionesComponent', () => {
  let component: SeleccionarAtencionesComponent;
  let fixture: ComponentFixture<SeleccionarAtencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarAtencionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
