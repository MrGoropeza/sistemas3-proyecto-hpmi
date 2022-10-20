import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesABMComponent } from './pacientes-abm.component';

describe('PacientesABMComponent', () => {
  let component: PacientesABMComponent;
  let fixture: ComponentFixture<PacientesABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
