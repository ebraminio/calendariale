import { amod, mod } from '../Astro';
import { hebrew } from '../Const';
import { LeapCalendar } from '../Calendar';

export class HebrewCalendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day, HebrewCalendar.isLeapYear (year));
  }

  // Determine Julian day number from Hebrew calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    let jdn, mon, months;

    months = this.hebrewYearMonths (year);

    jdn = hebrew.EPOCH + this.hebrewDelay1 (year) + this.hebrewDelay2 (year) + day + 1;

    if (month < 7) {
      for (mon = 7; mon <= months; mon += 1) {
        jdn += this.hebrewMonthDays (year, mon);
      }
      for (mon = 1; mon < month; mon += 1) {
        jdn += this.hebrewMonthDays (year, mon);
      }
    } else {
      for (mon = 7; mon < month; mon += 1) {
        jdn += this.hebrewMonthDays (year, mon);
      }
    }

    return jdn;
  }

  // Convert Julian date to Hebrew date
  // This works by making multiple calls to the inverse function, performing slowly.
  public static fromJdn (jdn: number) {
    let jd0, year, month, day, index, count, first;

    jd0   = Math.floor (jdn) + 0.5;
    count = Math.floor ((jd0 - hebrew.EPOCH) * 98496.0 / 35975351.0);
    year  = count - 1;

    for (index = count; jd0 >= this.toJdn (index, 7, 1); index += 1) {
      year += 1;
    }

    first = jd0 < this.toJdn (year, 1, 1) ? 7 : 1;
    month = first;

    for (index = first; jd0 > this.toJdn (year, index, this.hebrewMonthDays (year, index)); index += 1) {
      month += 1;
    }

    day = jd0 - this.toJdn (year, month, 1) + 1;

    return new HebrewCalendar (jdn, year, month, day);
  }

  // Is a given Hebrew year a leap year?
  private static isLeapYear (year: number) : boolean {
    return mod (year * 7 + 1, 19) < 7;
  }

  // How many months are there in a Hebrew year (12 = normal, 13 = leap)
  private static hebrewYearMonths (year: number) : number {
    return this.isLeapYear (year) ? 13 : 12;
  }

  // Test for delay of start of new year and to avoid
  // Sunday, Wednesday, and Friday as start of the new year.
  private static hebrewDelay1 (year: number) : number {
    let months, day, parts;

    months = Math.floor ((235 * year - 234) / 19);
    parts  = 12084 + 13753 * months;
    day    = months * 29 + Math.floor (parts / 25920);

    if (mod (3 * (day + 1), 7) < 3) {
      day += 1;
    }

    return day;
  }

  // Check for delay in start of new year due to length of adjacent years
  private static hebrewDelay2 (year: number) : number {
    let last, present, next;

    last    = this.hebrewDelay1 (year - 1);
    present = this.hebrewDelay1 (year);
    next    = this.hebrewDelay1 (year + 1);

    return next - present === 356 ? 2 : present - last === 382 ? 1 : 0;
  }

  // How many days are in a Hebrew year?
  private static hebrewYearDays (year: number) : number {
    return this.toJdn (year + 1, 7, 1) - this.toJdn (year, 7, 1);
  }

  // How many days are in a given month of a given year
  private static hebrewMonthDays (year: number, month: number) : number {
    // First of all, dispose of fixed-length 29 day months
    if (month === 2 || month === 4 || month === 6 || month === 10 || month === 13) {
      return 29;
    }

    // If it's not a leap year, Adar has 29 days
    if (month === 12 && !this.isLeapYear (year)) {
      return 29;
    }

    // If it's Heshvan, days depend on length of year
    if (month === 8 && mod (this.hebrewYearDays (year), 10) !== 5) {
      return 29;
    }

    // Similarly, Kislev varies with the length of year
    if (month === 9 && mod (this.hebrewYearDays (year), 10) === 3) {
      return 29;
    }

    // Nope, it's a 30 day month
    return 30;
  }
}