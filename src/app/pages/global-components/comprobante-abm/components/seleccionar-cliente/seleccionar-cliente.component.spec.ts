import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarClienteComponent } from './seleccionar-cliente.component';

describe('SeleccionarClienteComponent', () => {
  let component: SeleccionarClienteComponent;
  let fixture: ComponentFixture<SeleccionarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
