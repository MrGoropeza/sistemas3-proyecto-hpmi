import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosSeleccionadosComponent } from './articulos-seleccionados.component';

describe('ArticulosSeleccionadosComponent', () => {
  let component: ArticulosSeleccionadosComponent;
  let fixture: ComponentFixture<ArticulosSeleccionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosSeleccionadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosSeleccionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
