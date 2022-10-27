import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostBarChartComponent } from './cost-bar-chart.component';

describe('CostBarChartComponent', () => {
  let component: CostBarChartComponent;
  let fixture: ComponentFixture<CostBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
