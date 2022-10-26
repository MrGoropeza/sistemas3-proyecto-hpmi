import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPrestacionComponent } from './seleccionar-prestacion.component';

describe('SeleccionarPrestacionComponent', () => {
  let component: SeleccionarPrestacionComponent;
  let fixture: ComponentFixture<SeleccionarPrestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarPrestacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarPrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
