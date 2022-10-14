import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetalleDialogComponent } from './cliente-detalle-dialog.component';

describe('ClienteDetalleDialogComponent', () => {
  let component: ClienteDetalleDialogComponent;
  let fixture: ComponentFixture<ClienteDetalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteDetalleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
