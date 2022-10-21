import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesAbmComponent } from './prestaciones-abm.component';

describe('PrestacionesAbmComponent', () => {
  let component: PrestacionesAbmComponent;
  let fixture: ComponentFixture<PrestacionesAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestacionesAbmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestacionesAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
