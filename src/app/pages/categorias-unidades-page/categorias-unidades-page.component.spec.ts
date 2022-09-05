import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasUnidadesPageComponent } from './categorias-unidades-page.component';

describe('CategoriasUnidadesPageComponent', () => {
  let component: CategoriasUnidadesPageComponent;
  let fixture: ComponentFixture<CategoriasUnidadesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasUnidadesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasUnidadesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
