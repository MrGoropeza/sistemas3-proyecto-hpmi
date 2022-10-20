import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoPageComponent } from './medico-page.component';

describe('MedicoPageComponent', () => {
  let component: MedicoPageComponent;
  let fixture: ComponentFixture<MedicoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
