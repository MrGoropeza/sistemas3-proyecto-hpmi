import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasSectoresPageComponent } from './plantas-sectores-page.component';

describe('PlantasSectoresPageComponent', () => {
  let component: PlantasSectoresPageComponent;
  let fixture: ComponentFixture<PlantasSectoresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantasSectoresPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantasSectoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
