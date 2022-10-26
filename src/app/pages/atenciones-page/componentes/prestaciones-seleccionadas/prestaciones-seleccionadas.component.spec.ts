import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesSeleccionadasComponent } from './prestaciones-seleccionadas.component';

describe('PrestacionesSeleccionadasComponent', () => {
  let component: PrestacionesSeleccionadasComponent;
  let fixture: ComponentFixture<PrestacionesSeleccionadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestacionesSeleccionadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestacionesSeleccionadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
