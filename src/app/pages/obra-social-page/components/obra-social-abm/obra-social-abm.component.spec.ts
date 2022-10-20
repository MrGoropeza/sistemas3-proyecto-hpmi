import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialABMComponent } from './obra-social-abm.component';

describe('ObraSocialABMComponent', () => {
  let component: ObraSocialABMComponent;
  let fixture: ComponentFixture<ObraSocialABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraSocialABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraSocialABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
