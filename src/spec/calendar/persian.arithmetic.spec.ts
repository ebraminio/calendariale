import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { PersianArithmeticCalendar as cal } from '../../calendar/PersianArithmeticCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: -1208, month:  5, day:  1 } },
  { jdn:  -61387 + J0000, date: { year:  -790, month:  9, day: 14 } },
  { jdn:   25469 + J0000, date: { year:  -552, month:  7, day:  2 } },
  { jdn:   49217 + J0000, date: { year:  -487, month:  7, day:  9 } },
  { jdn:  171307 + J0000, date: { year:  -153, month: 10, day: 18 } },
  { jdn:  210155 + J0000, date: { year:   -46, month:  2, day: 30 } },
  { jdn:  253427 + J0000, date: { year:    73, month:  8, day: 19 } },
  { jdn:  369740 + J0000, date: { year:   392, month:  2, day:  5 } },
  { jdn:  400085 + J0000, date: { year:   475, month:  3, day:  3 } },
  { jdn:  434355 + J0000, date: { year:   569, month:  1, day:  3 } },
  { jdn:  452605 + J0000, date: { year:   618, month: 12, day: 20 } },
  { jdn:  470160 + J0000, date: { year:   667, month:  1, day: 14 } },
  { jdn:  473837 + J0000, date: { year:   677, month:  2, day:  8 } },
  { jdn:  507850 + J0000, date: { year:   770, month:  3, day: 22 } },
  { jdn:  524156 + J0000, date: { year:   814, month: 11, day: 13 } },
  { jdn:  544676 + J0000, date: { year:   871, month:  1, day: 21 } },
  { jdn:  567118 + J0000, date: { year:   932, month:  6, day: 28 } },
  { jdn:  569477 + J0000, date: { year:   938, month: 12, day: 14 } },
  { jdn:  601716 + J0000, date: { year:  1027, month:  3, day: 21 } },
  { jdn:  613424 + J0000, date: { year:  1059, month:  4, day: 10 } },
  { jdn:  626596 + J0000, date: { year:  1095, month:  5, day:  2 } },
  { jdn:  645554 + J0000, date: { year:  1147, month:  3, day: 30 } },
  { jdn:  664224 + J0000, date: { year:  1198, month:  5, day: 10 } },
  { jdn:  671401 + J0000, date: { year:  1218, month:  1, day:  7 } },
  { jdn:  694799 + J0000, date: { year:  1282, month:  1, day: 29 } },
  { jdn:  704424 + J0000, date: { year:  1308, month:  6, day:  3 } },
  { jdn:  708842 + J0000, date: { year:  1320, month:  7, day:  7 } },
  { jdn:  709409 + J0000, date: { year:  1322, month:  1, day: 29 } },
  { jdn:  709580 + J0000, date: { year:  1322, month:  7, day: 14 } },
  { jdn:  727274 + J0000, date: { year:  1370, month: 12, day: 27 } },
  { jdn:  728714 + J0000, date: { year:  1374, month: 12, day:  6 } },
  { jdn:  744313 + J0000, date: { year:  1417, month:  8, day: 19 } },
  { jdn:  764652 + J0000, date: { year:  1473, month:  4, day: 28 } },
];

describe ('Persian Arithmetic calendar spec', () => {
  it ('should convert a Persian Arithmetic date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Persian Arithmetic year', () => {
    dates.forEach (({ jdn, date }) => {
      const expected = date.year;
      const actual   = cal.jdnToYear (jdn);

      expect (actual).toBe (expected);
    });
  });

  it ('should convert a Julian day to a Persian Arithmetic date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const yearLeap = cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should determine whether a Persian Arithmetic year is leap year', () => {
    [ 4, 124, 165, 206, 739, 780, 821, 1313, 1354, 1395 ].forEach (year => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 1, 48, 142, 189, 236, 283, 377, 424, 471, 518, 612, 659, 753, 800, 847,
        894, 988, 1035, 1082, 1129, 1223, 1270, 1364 ].forEach (year => {
          expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1333,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1333,  7, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1333, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1334, 12, 30)).toThrow (INVALID_DAY);
   });
});
