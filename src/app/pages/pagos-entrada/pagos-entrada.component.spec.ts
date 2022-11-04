import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosEntradaComponent } from './pagos-entrada.component';

describe('PagosEntradaComponent', () => {
  let component: PagosEntradaComponent;
  let fixture: ComponentFixture<PagosEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
