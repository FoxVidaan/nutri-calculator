import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionCalculatorComponent } from './nutrition-calculator.component';

describe('NutritionCalculatorComponent', () => {
  let component: NutritionCalculatorComponent;
  let fixture: ComponentFixture<NutritionCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
