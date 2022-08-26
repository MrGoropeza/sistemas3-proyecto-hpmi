import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaPageComponent } from './farmacia-page.component';

describe('FarmaciaPageComponent', () => {
  let component: FarmaciaPageComponent;
  let fixture: ComponentFixture<FarmaciaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmaciaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmaciaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
