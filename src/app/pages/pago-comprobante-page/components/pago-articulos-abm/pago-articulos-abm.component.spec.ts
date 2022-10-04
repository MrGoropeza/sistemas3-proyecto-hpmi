import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoArticulosABMComponent } from './pago-articulos-abm.component';

describe('PagoArticulosABMComponent', () => {
  let component: PagoArticulosABMComponent;
  let fixture: ComponentFixture<PagoArticulosABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoArticulosABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoArticulosABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
