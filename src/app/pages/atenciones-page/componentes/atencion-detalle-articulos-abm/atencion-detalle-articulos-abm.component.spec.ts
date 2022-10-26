import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionDetalleArticulosABMComponent } from './atencion-detalle-articulos-abm.component';

describe('AtencionDetalleArticulosABMComponent', () => {
  let component: AtencionDetalleArticulosABMComponent;
  let fixture: ComponentFixture<AtencionDetalleArticulosABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionDetalleArticulosABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionDetalleArticulosABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
