import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraPageComponent } from './orden-compra-page.component';

describe('OrdenCompraPageComponent', () => {
  let component: OrdenCompraPageComponent;
  let fixture: ComponentFixture<OrdenCompraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenCompraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
