import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoDetalleDialogComponent } from './medico-detalle-dialog.component';

describe('MedicoDetalleDialogComponent', () => {
  let component: MedicoDetalleDialogComponent;
  let fixture: ComponentFixture<MedicoDetalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoDetalleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
