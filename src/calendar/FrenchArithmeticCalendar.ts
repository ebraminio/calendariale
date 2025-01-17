import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, french } from '../Const';

import { FrenchArithmeticDate } from './FrenchArithmeticDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class FrenchArithmeticCalendar {
  // Calculate date in the French Arithmetic calendar from Julian day number (JDN).
  public static fromJdn(jdn: number): FrenchArithmeticDate {
    const approx: number = Math.floor((jdn - french.EPOCH + 2) / (1460969 / 4000)) + 1;
    const year: number = jdn < this.toJdn(approx, 1, 1) ? approx - 1 : approx;
    let month: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 30);

    if (13 === month) {
      month = 0;
    }

    const day: number = jdn - this.toJdn(year, month, 1) + 1;

    return new FrenchArithmeticDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from French Arithmetic calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const y1: number = year - 1;
    const m = 0 === month ? 12 : month - 1;

    return (
      french.EPOCH -
      1 +
      365 * y1 +
      Math.floor(y1 / 4) -
      Math.floor(y1 / 100) +
      Math.floor(y1 / 400) -
      Math.floor(y1 / 4000) +
      30 * m +
      day
    );
  }

  // Is the given year a leap year in the French Arithmetic calendar ?
  public static isLeapYear(year: number): boolean {
    const m400: number = mod(year, 400);

    return mod(year, 4) === 0 && m400 !== 100 && m400 !== 200 && m400 !== 300 && mod(year, 4000) !== 0;
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 0 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const days: number = this.isLeapYear(year) ? 6 : 5;

    if (month === 0 && day > days) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }
}
