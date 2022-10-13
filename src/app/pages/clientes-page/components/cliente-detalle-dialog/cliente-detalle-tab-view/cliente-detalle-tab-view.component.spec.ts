import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetalleTabViewComponent } from './cliente-detalle-tab-view.component';

describe('ClienteDetalleTabViewComponent', () => {
  let component: ClienteDetalleTabViewComponent;
  let fixture: ComponentFixture<ClienteDetalleTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteDetalleTabViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDetalleTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
