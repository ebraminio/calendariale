import { GregorianCalendar } from './GregorianCalendar';
import { LeapDate } from './core/LeapDate';

export class GregorianDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, GregorianCalendar.isLeapYear(year));
  }
}
