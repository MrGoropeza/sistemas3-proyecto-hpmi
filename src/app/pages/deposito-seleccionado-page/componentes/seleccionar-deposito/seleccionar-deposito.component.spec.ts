import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarDepositoComponent } from './seleccionar-deposito.component';

describe('SeleccionarDepositoComponent', () => {
  let component: SeleccionarDepositoComponent;
  let fixture: ComponentFixture<SeleccionarDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarDepositoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
