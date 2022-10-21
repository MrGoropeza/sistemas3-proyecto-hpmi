import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeleccionadorComponent } from './form-seleccionador.component';

describe('FormSeleccionadorComponent', () => {
  let component: FormSeleccionadorComponent;
  let fixture: ComponentFixture<FormSeleccionadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSeleccionadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSeleccionadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
