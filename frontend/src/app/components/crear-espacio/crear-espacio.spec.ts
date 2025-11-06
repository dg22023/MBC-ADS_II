import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEspacio } from './crear-espacio';

describe('CrearEspacio', () => {
  let component: CrearEspacio;
  let fixture: ComponentFixture<CrearEspacio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEspacio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEspacio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
