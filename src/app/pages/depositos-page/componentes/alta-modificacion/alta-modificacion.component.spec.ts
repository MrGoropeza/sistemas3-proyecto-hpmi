import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaModificacionComponent } from './alta-modificacion.component';

describe('AltaModificacionComponent', () => {
  let component: AltaModificacionComponent;
  let fixture: ComponentFixture<AltaModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaModificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
