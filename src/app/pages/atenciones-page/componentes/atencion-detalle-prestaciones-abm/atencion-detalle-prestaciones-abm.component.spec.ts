import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionDetallePrestacionesABMComponent } from './atencion-detalle-prestaciones-abm.component';

describe('AtencionDetallePrestacionesABMComponent', () => {
  let component: AtencionDetallePrestacionesABMComponent;
  let fixture: ComponentFixture<AtencionDetallePrestacionesABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionDetallePrestacionesABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionDetallePrestacionesABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
