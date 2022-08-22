import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaVerticalComponent } from './tarjeta-vertical.component';

describe('TarjetaVerticalComponent', () => {
  let component: TarjetaVerticalComponent;
  let fixture: ComponentFixture<TarjetaVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaVerticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
