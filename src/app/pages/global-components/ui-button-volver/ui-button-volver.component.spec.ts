import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonVolverComponent } from './ui-button-volver.component';

describe('UiButtonVolverComponent', () => {
  let component: UiButtonVolverComponent;
  let fixture: ComponentFixture<UiButtonVolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiButtonVolverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiButtonVolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
