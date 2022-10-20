import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteABMComponent } from './cliente-abm.component';

describe('ClienteABMComponent', () => {
  let component: ClienteABMComponent;
  let fixture: ComponentFixture<ClienteABMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteABMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteABMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
