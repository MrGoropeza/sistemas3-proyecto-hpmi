import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoABMComponent } from './medico-abm.component';

describe('MedicoABMComponent', () => {
  let component: MedicoABMComponent;
  let fixture: ComponentFixture<MedicoABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
