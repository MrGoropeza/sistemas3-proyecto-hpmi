import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoSeleccionadoPageComponent } from './deposito-seleccionado-page.component';

describe('DepositoSeleccionadoPageComponent', () => {
  let component: DepositoSeleccionadoPageComponent;
  let fixture: ComponentFixture<DepositoSeleccionadoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositoSeleccionadoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositoSeleccionadoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
