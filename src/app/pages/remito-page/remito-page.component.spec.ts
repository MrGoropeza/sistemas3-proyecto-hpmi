import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitoPageComponent } from './remito-page.component';

describe('RemitoPageComponent', () => {
  let component: RemitoPageComponent;
  let fixture: ComponentFixture<RemitoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemitoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemitoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
