import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesPageComponent } from './prestaciones-page.component';

describe('PrestacionesPageComponent', () => {
  let component: PrestacionesPageComponent;
  let fixture: ComponentFixture<PrestacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestacionesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
