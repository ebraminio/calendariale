import { mod } from '../Astro';
import { ethiopic } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class EthiopicCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);
  }

  // Determine Julian day number from Ethiopic calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    return ethiopic.EPOCH - 1  + 365 * (year - 1)  +
            Math.floor (year / 4) + 30 * (month - 1)  + day;
  }

  // Calculate Ethiopic calendar date from Julian day
  public static fromJdn (jdn: number) {
    const year  = Math.floor ((4 * (jdn - ethiopic.EPOCH) + 1463) / 1461);
    const month = 1 + Math.floor ((jdn - this.toJdn (year, 1, 1)) / 30);
    const day   = jdn + 1 - this.toJdn (year, month, 1);

    return new EthiopicCalendar (jdn, year, month, day);
  }
}