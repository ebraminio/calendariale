import { phasisOnOrAfter, phasisOnOrBefore, solarLongitudeAfter, standardToUniversal, sunset } from '../Astro';
import { HebrewMonth, INVALID_DAY, INVALID_MONTH, J0000, Season, hebrew } from '../Const';

import { GregorianCalendar } from './GregorianCalendar';
import { HebrewCalendar } from './HebrewCalendar';
import { HebrewObservationalDate } from './HebrewObservationalDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class HebrewObservationalCalendar {
  // Convert Julian day number (JDN) to Hebrew date
  // This works by making multiple calls to the inverse function, performing slowly.
  public static fromJdn(jdn: number): HebrewObservationalDate {
    const crescent: number = phasisOnOrBefore(jdn, hebrew.LOCATION_JAFFA);
    const gYear: number = GregorianCalendar.jdnToYear(jdn);
    const newYear: number = this.toNewYear(gYear);
    const newYear2: number = jdn < newYear ? this.toNewYear(gYear - 1) : newYear;
    const month: number = Math.round((crescent - newYear2) / 29.5) + 1;
    const year: number = HebrewCalendar.fromJdn(newYear2).getYear() + (month >= HebrewMonth.TISHRI ? 1 : 0);
    const day: number = jdn - crescent + 1;

    return new HebrewObservationalDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Hebrew calendar date
  public static toJdn(year: number, month: number, day: number): number {
    const jdn: number = this.calculateJdn(year, month, day);

    const date: HebrewObservationalDate = this.fromJdn(jdn);
    if (day < 1 || day !== date.getDay()) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
    if (month < 1 || date.getMonth() !== month) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    return jdn;
  }

  // Determine Julian day number (JDN) from Hebrew calendar date
  private static calculateJdn(year: number, month: number, day: number): number {
    const year1: number = month >= HebrewMonth.TISHRI ? year - 1 : year;
    const start: number = HebrewCalendar.toJdn(year1, HebrewMonth.NISAN, 1);
    const gYear: number = GregorianCalendar.jdnToYear(start + 60);
    const newYear: number = this.toNewYear(gYear) + 0.5;
    const midMonth: number = newYear + Math.round(29.5 * (month - 1)) + 15;

    return phasisOnOrBefore(midMonth, hebrew.LOCATION_JAFFA) + day - 0.5;
  }

  // Return jdn of Observational (classical) Nisan 1 occurring in Gregorian year.
  private static toNewYear(year: number): number {
    const jan1: number = GregorianCalendar.toJdn(year, 1, 1) - J0000;
    const equinox: number = solarLongitudeAfter(Season.SPRING, jan1);
    const sset: number = standardToUniversal(sunset(Math.floor(equinox), hebrew.LOCATION_JAFFA), hebrew.LOCATION_JAFFA);

    return phasisOnOrAfter(Math.floor(equinox) - (equinox < sset ? 14 : 13), hebrew.LOCATION_JAFFA);
  }
}
