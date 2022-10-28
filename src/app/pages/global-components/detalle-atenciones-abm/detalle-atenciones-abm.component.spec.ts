import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAtencionesABMComponent } from './detalle-atenciones-abm.component';

describe('DetalleAtencionesABMComponent', () => {
  let component: DetalleAtencionesABMComponent;
  let fixture: ComponentFixture<DetalleAtencionesABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAtencionesABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAtencionesABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
