import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoABMComponent } from './movimiento-abm.component';

describe('MovimientoABMComponent', () => {
  let component: MovimientoABMComponent;
  let fixture: ComponentFixture<MovimientoABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
