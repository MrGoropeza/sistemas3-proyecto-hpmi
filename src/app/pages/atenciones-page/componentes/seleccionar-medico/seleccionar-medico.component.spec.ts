import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarMedicoComponent } from './seleccionar-medico.component';

describe('SeleccionarMedicoComponent', () => {
  let component: SeleccionarMedicoComponent;
  let fixture: ComponentFixture<SeleccionarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
