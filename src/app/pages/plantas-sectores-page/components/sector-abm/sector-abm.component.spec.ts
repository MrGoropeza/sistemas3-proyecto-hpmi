import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorABMComponent } from './sector-abm.component';

describe('SectorABMComponent', () => {
  let component: SectorABMComponent;
  let fixture: ComponentFixture<SectorABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
