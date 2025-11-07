import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookingservice } from './bookingservice';

describe('Bookingservice', () => {
  let component: Bookingservice;
  let fixture: ComponentFixture<Bookingservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookingservice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookingservice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
