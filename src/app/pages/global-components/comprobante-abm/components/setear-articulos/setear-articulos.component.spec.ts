import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetearArticulosComponent } from './setear-articulos.component';

describe('SetearArticulosComponent', () => {
  let component: SetearArticulosComponent;
  let fixture: ComponentFixture<SetearArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetearArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetearArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
