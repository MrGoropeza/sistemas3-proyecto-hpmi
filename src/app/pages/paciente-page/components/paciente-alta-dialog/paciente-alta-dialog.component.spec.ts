import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAltaDialogComponent } from './paciente-alta-dialog.component';

describe('PacienteAltaDialogComponent', () => {
  let component: PacienteAltaDialogComponent;
  let fixture: ComponentFixture<PacienteAltaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteAltaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteAltaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
