import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoAltaDialogComponent } from './medico-alta-dialog.component';

describe('MedicoAltaDialogComponent', () => {
  let component: MedicoAltaDialogComponent;
  let fixture: ComponentFixture<MedicoAltaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoAltaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoAltaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
