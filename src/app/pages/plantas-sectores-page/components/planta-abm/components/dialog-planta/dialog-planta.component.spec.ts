import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPlantaComponent } from './dialog-planta.component';

describe('DialogPlantaComponent', () => {
  let component: DialogPlantaComponent;
  let fixture: ComponentFixture<DialogPlantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPlantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
