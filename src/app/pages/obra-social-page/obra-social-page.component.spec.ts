import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialPageComponent } from './obra-social-page.component';

describe('ObraSocialPageComponent', () => {
  let component: ObraSocialPageComponent;
  let fixture: ComponentFixture<ObraSocialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraSocialPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraSocialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
