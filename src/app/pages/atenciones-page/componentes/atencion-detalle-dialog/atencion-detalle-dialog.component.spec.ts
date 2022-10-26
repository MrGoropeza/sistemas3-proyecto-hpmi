import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionDetalleDialogComponent } from './atencion-detalle-dialog.component';

describe('AtencionDetalleDialogComponent', () => {
  let component: AtencionDetalleDialogComponent;
  let fixture: ComponentFixture<AtencionDetalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionDetalleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
