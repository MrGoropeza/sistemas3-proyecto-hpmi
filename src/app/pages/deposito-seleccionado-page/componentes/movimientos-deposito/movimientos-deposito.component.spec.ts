import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosDepositoComponent } from './movimientos-deposito.component';

describe('MovimientosDepositoComponent', () => {
  let component: MovimientosDepositoComponent;
  let fixture: ComponentFixture<MovimientosDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosDepositoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
