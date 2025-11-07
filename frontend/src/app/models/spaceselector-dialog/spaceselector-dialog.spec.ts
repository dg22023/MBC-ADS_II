import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceselectorDialog } from './spaceselector-dialog';

describe('SpaceselectorDialog', () => {
  let component: SpaceselectorDialog;
  let fixture: ComponentFixture<SpaceselectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceselectorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceselectorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
