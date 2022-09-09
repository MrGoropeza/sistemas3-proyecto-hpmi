import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoFarmaciaPageComponent } from './deposito-farmacia-page.component';

describe('DepositoFarmaciaPageComponent', () => {
  let component: DepositoFarmaciaPageComponent;
  let fixture: ComponentFixture<DepositoFarmaciaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositoFarmaciaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositoFarmaciaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
