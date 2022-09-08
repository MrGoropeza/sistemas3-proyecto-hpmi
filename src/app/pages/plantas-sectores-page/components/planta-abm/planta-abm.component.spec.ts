import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantaABMComponent } from './planta-abm.component';

describe('PlantaABMComponent', () => {
  let component: PlantaABMComponent;
  let fixture: ComponentFixture<PlantaABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantaABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantaABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
