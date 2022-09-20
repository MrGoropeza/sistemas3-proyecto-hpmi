import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarArticulosComponent } from './seleccionar-articulos.component';

describe('SeleccionarArticulosComponent', () => {
  let component: SeleccionarArticulosComponent;
  let fixture: ComponentFixture<SeleccionarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
