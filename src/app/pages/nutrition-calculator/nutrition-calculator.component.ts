import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FeedingBottle } from '../../models/FeedingBottle.model';
import { NgFor, NgIf } from '@angular/common';
import { NutritionResult } from '../../models/NutritionResult.model';

@Component({
  selector: 'app-nutrition-calculator',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './nutrition-calculator.component.html',
  styleUrl: './nutrition-calculator.component.scss',
})
export class NutritionCalculatorComponent {
  feedingBottles: FeedingBottle[] = [{}];
  isModulen: boolean = false;
  powderPerBox: number = 400;
  powderPerDose?: number;
  asBleed: boolean = false;
  bleed?: number;
  waterPerDose?: number;
  nutritionDays: number = 28;
  result: NutritionResult | null = null;

  addFeedingBottle(): void {
    this.feedingBottles.push({ volume: 0, quantity: 0 });
  }

  removeFeedingBottle(index: number): void {
    if (this.feedingBottles.length > 1) {
      this.feedingBottles.splice(index, 1);
    }
  }

  showResult() {
    if (!this.waterPerDose || !this.powderPerDose) {
      return;
    }

    let totalFeedingVolume: number = 0;
    let totalDosePerDay: number = 0;
    let totalPowderPerDay: number = 0;
    let totalPowderBoxPerPeriod: number = 0;

    this.feedingBottles.forEach((feedingBottle: FeedingBottle) => {
      if (feedingBottle.quantity && feedingBottle.volume) {
        if (this.asBleed && this.bleed) {
          feedingBottle.volume += this.bleed;
        }

        totalFeedingVolume += feedingBottle.quantity * feedingBottle.volume;
      }
    });

    if (this.isModulen) {
      const waterPerDoseWithModulen: number =
        this.waterPerDose + (80 * this.powderPerDose) / 100;
      totalDosePerDay =
        Math.round((totalFeedingVolume / waterPerDoseWithModulen) * 100) / 100;
    } else {
      totalDosePerDay =
        Math.round((totalFeedingVolume / this.waterPerDose) * 100) / 100;
    }

    totalPowderPerDay =
      Math.round(totalDosePerDay * this.powderPerDose * 100) / 100;
    totalPowderBoxPerPeriod =
      Math.round(
        ((totalPowderPerDay * this.nutritionDays) / this.powderPerBox) * 100
      ) / 100;

    this.result = {
      totalFeedingVolume,
      totalDosePerDay,
      totalPowderPerDay,
      totalPowderBoxPerPeriod,
    };
  }
}
