import { amod, mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, persian } from '../Const';

import { PersianArithmeticDate } from './PersianArithmeticDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class PersianArithmeticCalendar {
  // Calculate Persian Arithmetic calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): PersianArithmeticDate {
    const year: number = this.jdnToYear(jdn);

    let yDay: number = jdn - this.toJdn(year, 1, 1) + 1;
    let month: number;
    let day: number;

    if (yDay <= 186) {
      month = Math.ceil(yDay / 31);
      day = amod(yDay, 31);
    } else {
      yDay -= 6;
      month = Math.ceil(yDay / 30);
      day = amod(yDay, 30);
    }

    return new PersianArithmeticDate(jdn, year, month, day);
  }

  // Is a given year in the Persian Arithmetic calendar a leap year?
  public static isLeapYear(year: number): boolean {
    const y0: number = year > 0 ? year - 474 : year - 473;
    const y1: number = mod(y0, 2820) + 474;

    return mod((y1 + 38) * 31, 128) < 31;
  }

  // Determine Julian day number (JDN) from Persian Arithmetic calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const y0: number = year > 0 ? year - 474 : year - 473;
    const y1: number = mod(y0, 2820) + 474;
    const offset: number = month <= 7 ? 31 * (month - 1) : 30 * (month - 1) + 6;

    return (
      persian.EPOCH -
      1 +
      1029983 * Math.floor(y0 / 2820) +
      365 * (y1 - 1) +
      Math.floor((31 * y1 - 5) / 128) +
      offset +
      day
    );
  }

  // Determine the year in the Persian Arithmetic calendar in which a
  // given Julian day number (JDN) falls.
  public static jdnToYear(jdn: number): number {
    const d0: number = jdn - this.toJdn(475, 1, 1);
    const n2820: number = Math.floor(d0 / 1029983);
    const d1: number = mod(d0, 1029983);
    const y2820: number = d1 === 1029982 ? 2820 : Math.floor((128 * d1 + 46878) / 46751);
    const year: number = 474 + 2820 * n2820 + y2820;

    return year > 0 ? year : year - 1;
  }

  private static validate(year: number, month: number, day: number): void {
    const maxDays: number = month < 7 ? 31 : !this.isLeapYear(year) && month === 12 ? 29 : 30;

    if (day < 1 || day > maxDays) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }
  }
}
