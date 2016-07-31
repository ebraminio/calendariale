import { amod, mod, next } from '../Astro';
import { hindu, J0000 } from '../Const';
import { hinduCalendarYear, hinduLunarDayFromMoment, hinduNewMoonBefore, hinduSolarLongitude, hinduSunrise, hinduZodiac } from '../HinduAlgorithms';
import { CalendarValidationException, LeapDayMonthCalendar } from '../Calendar';

export class HinduLunarModernCalendar extends LeapDayMonthCalendar {
  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean) {
    super(jdn, year, month, day, monthLeap, dayLeap);
  }

  // Calculate Hindu Lunar Modern calendar date from Julian day
  public static fromJdn(jdn: number): HinduLunarModernCalendar {
    const jd0: number = jdn - J0000;
    const critical: number = hinduSunrise(jd0);
    const day: number = hinduLunarDayFromMoment(critical);
    const dayLeap: boolean = day === hinduLunarDayFromMoment(hinduSunrise(jd0 - 1));
    const lastNewMoon: number = hinduNewMoonBefore(critical);
    const nextNewMoon: number = hinduNewMoonBefore(Math.floor(lastNewMoon) + 35);
    const monthSolar: number = hinduZodiac(lastNewMoon);
    const monthLeap: boolean = monthSolar === hinduZodiac(nextNewMoon);
    const month: number = amod(monthSolar + 1, 12);
    const year: number = hinduCalendarYear(month <= 2 ? jd0 + 180 : jd0) - hindu.LUNAR_ERA;

    return new HinduLunarModernCalendar(jdn, year, month, monthLeap, day, dayLeap);
  }

  // Determine Julian day number from Hindu Lunar Modern calendar date
  public static toJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const jdn: number = this.calculateJdn(year, month, monthLeap, day, dayLeap);
    this.validate(year, month, monthLeap, day, dayLeap, jdn);

    return jdn;
  }

  private static validate(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean, jdn: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException('Invalid month');
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException('Invalid day');
    }

    const date: HinduLunarModernCalendar = this.fromJdn(jdn);
    if (monthLeap !== date.isMonthLeap()) {
      throw new CalendarValidationException('Invalid leap month');
    }

    if (dayLeap !== date.isDayLeap()) {
      throw new CalendarValidationException('Invalid leap day');
    }

    if (day !== date.day) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  private static calculateJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const approx: number = hindu.EPOCH_RD + hindu.SIDEREAL_YEAR * (year + hindu.LUNAR_ERA + (month - 1) / 12);
    const s: number = Math.floor(approx + 180 - hindu.SIDEREAL_YEAR *
      mod(hinduSolarLongitude(approx) - (month - 1) * 30 + 180, 360) / 360);
    const k: number = hinduLunarDayFromMoment(s + 0.25);

    let temp: number, mid: HinduLunarModernCalendar;

    if (k > 3 && k < 27) {
      temp = k;
    } else {
      mid = this.fromJdn(s - 15 + J0000);

      if (mid.month !== month || (mid.monthLeap && !monthLeap)) {
        temp = mod(k + 15, 30) - 15;
      } else {
        temp = mod(k - 15, 30) + 15;
      }
    }

    const est: number = s + day - temp;
    const tau: number = est - mod(hinduLunarDayFromMoment(est + 0.25) - day + 15, 30) + 15;

    const date: number = next(tau - 1, function (d): boolean {
      const d1: number = hinduLunarDayFromMoment(hinduSunrise(d)),
        d2: number = amod(day + 1, 30);

      return d1 === day || d1 === d2;
    }) + (dayLeap ? 1 : 0);

    return date + J0000;
  }
}
