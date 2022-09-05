import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesDialogComponent } from './unidades-dialog.component';

describe('UnidadesDialogComponent', () => {
  let component: UnidadesDialogComponent;
  let fixture: ComponentFixture<UnidadesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
