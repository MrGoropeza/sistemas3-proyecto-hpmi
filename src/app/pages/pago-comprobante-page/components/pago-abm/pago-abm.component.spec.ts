import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoABMComponent } from './pago-abm.component';

describe('PagoABMComponent', () => {
  let component: PagoABMComponent;
  let fixture: ComponentFixture<PagoABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
