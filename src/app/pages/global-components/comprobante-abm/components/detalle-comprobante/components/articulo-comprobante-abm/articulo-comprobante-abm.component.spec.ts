import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloComprobanteABMComponent } from './articulo-comprobante-abm.component';

describe('ArticuloComprobanteABMComponent', () => {
  let component: ArticuloComprobanteABMComponent;
  let fixture: ComponentFixture<ArticuloComprobanteABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloComprobanteABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloComprobanteABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
