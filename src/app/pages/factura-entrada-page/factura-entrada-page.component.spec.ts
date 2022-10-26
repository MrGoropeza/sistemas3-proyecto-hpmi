import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaEntradaPageComponent } from './factura-entrada-page.component';

describe('FacturaEntradaPageComponent', () => {
  let component: FacturaEntradaPageComponent;
  let fixture: ComponentFixture<FacturaEntradaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaEntradaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaEntradaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
