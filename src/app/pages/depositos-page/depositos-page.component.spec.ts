import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosPageComponent } from './depositos-page.component';

describe('DepositosPageComponent', () => {
  let component: DepositosPageComponent;
  let fixture: ComponentFixture<DepositosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
