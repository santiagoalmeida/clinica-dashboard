import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDashboard } from './citas-dashboard';

describe('CitasDashboard', () => {
  let component: CitasDashboard;
  let fixture: ComponentFixture<CitasDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
