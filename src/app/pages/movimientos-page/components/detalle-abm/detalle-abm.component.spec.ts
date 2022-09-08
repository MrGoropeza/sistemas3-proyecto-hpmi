import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleABMComponent } from './detalle-abm.component';

describe('DetalleABMComponent', () => {
  let component: DetalleABMComponent;
  let fixture: ComponentFixture<DetalleABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
