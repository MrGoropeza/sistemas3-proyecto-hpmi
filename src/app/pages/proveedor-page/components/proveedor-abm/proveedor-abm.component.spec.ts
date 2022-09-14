import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorABMComponent } from './proveedor-abm.component';

describe('ProveedorABMComponent', () => {
  let component: ProveedorABMComponent;
  let fixture: ComponentFixture<ProveedorABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
