import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteABMComponent } from './comprobante-abm.component';

describe('ComprobanteABMComponent', () => {
  let component: ComprobanteABMComponent;
  let fixture: ComponentFixture<ComprobanteABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobanteABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobanteABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
