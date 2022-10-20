import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialAltaDialogComponent } from './obra-social-alta-dialog.component';

describe('ObraSocialAltaDialogComponent', () => {
  let component: ObraSocialAltaDialogComponent;
  let fixture: ComponentFixture<ObraSocialAltaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObraSocialAltaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObraSocialAltaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
