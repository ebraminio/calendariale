import { mod } from '../Astro';
import { ethiopic } from '../Const';
import { CalendarValidationException, YearMonthCalendar } from '../Calendar';

export class EthiopicCalendar extends YearMonthCalendar {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }

  // Determine Julian day number from Ethiopic calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return ethiopic.EPOCH - 1 + 365 * (year - 1) +
      Math.floor(year / 4) + 30 * (month - 1) + day;
  }

  // Calculate Ethiopic calendar date from Julian day
  public static fromJdn(jdn: number) : EthiopicCalendar {
    const year: number = Math.floor((4 * (jdn - ethiopic.EPOCH) + 1463) / 1461);
    const month: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 30);
    const day: number = jdn + 1 - this.toJdn(year, month, 1);

    return new EthiopicCalendar(jdn, year, month, day);
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarValidationException('Invalid month');
    }

    if (month === 13 && day > 5) {
      throw new CalendarValidationException('Invalid day');
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException('Invalid day');
    }
  }
}
