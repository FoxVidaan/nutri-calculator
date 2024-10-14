import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NutritionCalculatorComponent } from './pages/nutrition-calculator/nutrition-calculator.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nutrition', component: NutritionCalculatorComponent },
  { path: '**', redirectTo: '' },
];
