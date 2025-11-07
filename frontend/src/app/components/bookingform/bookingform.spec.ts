import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookingform } from './bookingform';

describe('Bookingform', () => {
  let component: Bookingform;
  let fixture: ComponentFixture<Bookingform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookingform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookingform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
