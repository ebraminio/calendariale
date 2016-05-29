import { amod, estimatePriorSolarLongitude, mod, next, newMoonAtOrAfter, newMoonBefore,
    solarLongitude, solarLongitudeAfter, standardToUniversal, universalToStandard } from '../Astro';
import { chinese, J0000, MEAN_SYNODIC_MONTH, MEAN_TROPICAL_YEAR, Month, Season } from '../Const';
import { LeapMonthCalendar } from '../Calendar';
import { GregorianCalendar } from './GregorianCalendar';

export class ChineseCalendar extends LeapMonthCalendar {
  constructor (jdn: number, private cycle: number, year: number, month: number, monthLeap: boolean, day: number) {
    super (jdn, year, month, day, monthLeap, monthLeap);
  }

  // Determine Julian day number from Chinese calendar date
  public static toJdn (cycle: number, year: number, month: number, monthLeap: boolean, day: number) : number {
    const midYear = Math.floor (chinese.EPOCH + ((cycle - 1) * 60 + year - 0.5) * MEAN_TROPICAL_YEAR) - J0000;
    const newYear = this.chineseNewYearOnOrBefore (midYear);
    const p       = this.chineseNewMoonOnOrAfter (newYear + (month - 1) * 29);
    const d       = this.fromJdn (p + J0000);
    const priorNewMoon = month === d.getMonth () && monthLeap === d.isMonthLeap () ?
      p : this.chineseNewMoonOnOrAfter (1 + p);

    return priorNewMoon + J0000 + day - 1;
  }

  // Calculate Chinese calendar date from Julian day
  public static fromJdn (jdn: number) {
    const jd0       = jdn - J0000;
    const s1        = this.chineseWinterSolsticeOnOrBefore (jd0);
    const s2        = this.chineseWinterSolsticeOnOrBefore (s1 + 370);
    const next_m11  = this.chineseNewMoonBefore (1 + s2);
    const m12       = this.chineseNewMoonOnOrAfter (1 + s1);
    const yearLeap  = Math.round ((next_m11 - m12) / MEAN_SYNODIC_MONTH) === 12;

    const m         = this.chineseNewMoonBefore (1 + jd0);
    const month     = amod (Math.round ((m - m12) / MEAN_SYNODIC_MONTH) -
            (yearLeap && this.isChinesePriorLeapMonth (m12, m) ? 1 : 0), 12);
    const monthLeap = (yearLeap && this.isChineseNoMajorSolarTerm (m) &&
                    (!this.isChinesePriorLeapMonth (m12, this.chineseNewMoonBefore (m))));
    const years     = Math.floor (1.5 - (month / 12) + ((jd0 - chinese.EPOCH_RD) / MEAN_TROPICAL_YEAR));
    const cycle     = 1 + Math.floor ((years - 1) / 60);
    const year      = amod (years, 60);
    const day       = 1 + jd0 - m;

    return new ChineseCalendar (jdn, cycle, year, month, monthLeap, day);
  }

  // Return True if there is a Chinese leap month on or after lunar month starting on
  // Julian day number m_prime and at or before lunar month starting at m.
  private static isChinesePriorLeapMonth (m_prime: number, m: number) : boolean {
    return (m >= m_prime) &&
           (this.isChineseNoMajorSolarTerm (m) ||
            this.isChinesePriorLeapMonth (m_prime, this.chineseNewMoonBefore (m)));
  }

  // Return Julian day number of Chinese New Year in given Gregorian year.
  private static chineseNewYear (gYear: number) : number {
    return this.chineseNewYearOnOrBefore (GregorianCalendar.toJdn (gYear, Month.JULY, 1));
  }

  // Return Julian day number of Chinese New Year on or before given date,.
  private static chineseNewYearOnOrBefore (fixed: number) : number {
    const newYear = this.chineseNewYearInSui (fixed);

    return (fixed >= newYear) ? newYear : this.chineseNewYearInSui (fixed - 180);
  }

  // Return Julian day number of Chinese New Year in sui (period from solstice
  // to solstice) containing given date.
  private static chineseNewYearInSui (fixed: number) : number {
    const s1       = this.chineseWinterSolsticeOnOrBefore (fixed);
    const s2       = this.chineseWinterSolsticeOnOrBefore (s1 + 370);
    const next_m11 = this.chineseNewMoonBefore (1 + s2);
    const m12      = this.chineseNewMoonOnOrAfter (1 + s1);
    const m13      = this.chineseNewMoonOnOrAfter (1 + m12);
    const yearLeap = Math.round ((next_m11 - m12) / MEAN_SYNODIC_MONTH) === 12;

    if (yearLeap && (this.isChineseNoMajorSolarTerm (m12) || this.isChineseNoMajorSolarTerm (m13))) {
      return this.chineseNewMoonOnOrAfter (1 + m13);
    }

    return m13;
  }

  // Return Julian day number (Beijing) of first new moon before given date.
  private static chineseNewMoonBefore (fixed: number) : number {
    const tee = newMoonBefore (this.midnightInChina (fixed));

    return Math.floor (universalToStandard (tee, this.chineseLocation (tee)));
  }

  // Return Julian day number (Beijing) of first new moon on or aftergiven date.
  private static chineseNewMoonOnOrAfter (fixed: number) : number {
    const tee = newMoonAtOrAfter (this.midnightInChina (fixed));

    return Math.floor (universalToStandard (tee, this.chineseLocation (tee)));
  }

  // Return Julian day number in the Chinese zone, of winter solstice on or before given date.
  private static chineseWinterSolsticeOnOrBefore (fixed: number) : number {
    const approx = estimatePriorSolarLongitude (Season.WINTER, this.midnightInChina (fixed + 1));

    return next (Math.floor (approx) - 1,
      function (day) {
        return Season.WINTER < solarLongitude (ChineseCalendar.midnightInChina (1 + day));
    });
  }

  // Return Universal time of (clock) midnight at start of given date, in China.
  private static midnightInChina (fixed: number) : number {
    return standardToUniversal (fixed, this.chineseLocation (fixed));
  }

  // Return location of Beijing; time zone varies with time.
  private static chineseLocation (fixed: number) {
    return (fixed < chinese.EPOCH_1929_RD) ?
      chinese.LOCATION_BEFORE_1929 :
      chinese.LOCATION_SINCE_1929;
  }

  // Does the Chinese lunar month starting on given date have no major solar term ?
  private static isChineseNoMajorSolarTerm (fixed: number) : boolean {
    const newMoon = this.chineseNewMoonOnOrAfter (fixed + 1);

    return this.currentMajorSolarTerm (fixed) === this.currentMajorSolarTerm (newMoon);
  }

  // Return moment (in Beijing) of the first Chinese minor solar term (jieqi)
  // on or after given date.
  // The minor terms begin when the sun's longitude is an odd multiple of 15 degrees.
  private static minorSolarTermOnOrAfter (fixed: number) : number {
    const s = solarLongitude (this.midnightInChina (fixed));
    const l = mod (30 * Math.ceil ((s - 15) / 30) + 15, 360);

    return this.chineseSolarLongitudeOnOrAfter (l, fixed);
  }

  // Return last Chinese minor solar term (jieqi) before given date.
  private static currentMinorSolarTerm (fixed: number) : number {
    const s = solarLongitude (
        standardToUniversal (fixed, this.chineseLocation (fixed)));

    return amod (3 + Math.floor ((s - 15) / 30), 12);
  }

  // Return moment (in Beijing) of the first Chinese major solar term (zhongqi)
  // on or after given date.
  // The major terms begin when the sun's longitude is a multiple of 30 degrees.
  private static majorSolarTermOnOrAfter (fixed: number) : number {
    const s = solarLongitude (this.midnightInChina (fixed));
    const l = mod (30 * Math.ceil (s / 30), 360);

    return this.chineseSolarLongitudeOnOrAfter (l, fixed);
  }

  // Return last Chinese major solar term (zhongqi) before given date.
  private static currentMajorSolarTerm (date: number): number {
    const s = Math.floor (solarLongitude (standardToUniversal (date, this.chineseLocation (date))));

    return amod (2 + Math.floor (s / 30), 12);
  }

  // Return moment (Beijing time) of the first date on or after given date,
  // (Beijing time) when the solar longitude will be 'lambda' degrees.
  private static chineseSolarLongitudeOnOrAfter (lambda: number, fixed: number) : number {
    const tee = solarLongitudeAfter (lambda, standardToUniversal (fixed, this.chineseLocation (fixed)));

    return universalToStandard (tee, this.chineseLocation (tee));
  }
}