import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNuevoDialogComponent } from './cliente-nuevo-dialog.component';

describe('ClienteNuevoDialogComponent', () => {
  let component: ClienteNuevoDialogComponent;
  let fixture: ComponentFixture<ClienteNuevoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteNuevoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteNuevoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
