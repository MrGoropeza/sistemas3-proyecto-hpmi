import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesDialogComponent } from './prestaciones-dialog.component';

describe('PrestacionesDialogComponent', () => {
  let component: PrestacionesDialogComponent;
  let fixture: ComponentFixture<PrestacionesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestacionesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestacionesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
