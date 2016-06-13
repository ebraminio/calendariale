import { mod, phasisOnOrBefore } from '../Astro';
import { islamic, J0000, MEAN_SYNODIC_MONTH } from '../Const';
import { CalendarValidationException, LeapCalendar } from '../Calendar';

export class IslamicObservationalCalendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day, IslamicObservationalCalendar.isLeapYear (year));
  }

  // Is a given year in the Islamic calendar a leap year?
  public static isLeapYear (year: number) : boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  // Determine Julian day number from Islamic Observational calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    this.validate (year, month, day);

    const midMonth = islamic.EPOCH + Math.floor (((year - 1) * 12 + month - 0.5) * MEAN_SYNODIC_MONTH);

    return phasisOnOrBefore (midMonth, islamic.CAIRO_LOCATION) + day - 1;
  }

  public static validate (year: number, month: number, day: number) : void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException ('Invalid month');
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException ('Invalid day');
    }
  }

  // Calculate Islamic calendar date from Julian day
  public static fromJdn (jdn: number) {
    const crescent = phasisOnOrBefore (jdn, islamic.CAIRO_LOCATION);
    const elapsedMonths = Math.round ((crescent - islamic.EPOCH) / MEAN_SYNODIC_MONTH);
    const year = Math.floor (elapsedMonths / 12) + 1;
    const month = mod (elapsedMonths, 12) + 1;
    const day = jdn - crescent + 1;

    return new IslamicObservationalCalendar (jdn, year, month, day);
  }
}
