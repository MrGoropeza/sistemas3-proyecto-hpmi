import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialASeleccionarComponent } from './obra-social-aseleccionar.component';

describe('ObraSocialASeleccionarComponent', () => {
  let component: ObraSocialASeleccionarComponent;
  let fixture: ComponentFixture<ObraSocialASeleccionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraSocialASeleccionarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraSocialASeleccionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
