import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxdDialogComponent } from './axd-dialog.component';

describe('AxdDialogComponent', () => {
  let component: AxdDialogComponent;
  let fixture: ComponentFixture<AxdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxdDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
