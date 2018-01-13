/* global describe it: true */

import { expect } from 'chai';
import 'dirty-chai';
import { describe, it } from 'mocha';

import { J0000 } from '../../Const';
import { HinduLunarAstroCalendar as cal } from '../../calendar/HinduLunarAstroCalendar';

const data4 = [
  { 'rataDie': -214193, 'hinduLunarAstro': { 'year': -529, 'month':  6, 'monthLeap': true,  'day': 11, 'dayLeap': false } },
  { 'rataDie':  -61387, 'hinduLunarAstro': { 'year': -111, 'month':  9, 'monthLeap': false, 'day': 27, 'dayLeap': false } },
  { 'rataDie':   25469, 'hinduLunarAstro': { 'year':  127, 'month':  8, 'monthLeap': false, 'day':  3, 'dayLeap': true  } },
  { 'rataDie':   49217, 'hinduLunarAstro': { 'year':  192, 'month':  8, 'monthLeap': false, 'day':  9, 'dayLeap': false } },
  { 'rataDie':  171307, 'hinduLunarAstro': { 'year':  526, 'month': 10, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  210155, 'hinduLunarAstro': { 'year':  633, 'month':  3, 'monthLeap': false, 'day':  5, 'dayLeap': false } },
  { 'rataDie':  253427, 'hinduLunarAstro': { 'year':  751, 'month':  8, 'monthLeap': false, 'day': 15, 'dayLeap': false } },
  { 'rataDie':  369740, 'hinduLunarAstro': { 'year': 1070, 'month':  2, 'monthLeap': false, 'day':  6, 'dayLeap': false } },
  { 'rataDie':  400085, 'hinduLunarAstro': { 'year': 1153, 'month':  2, 'monthLeap': false, 'day': 23, 'dayLeap': false } },
  { 'rataDie':  434355, 'hinduLunarAstro': { 'year': 1247, 'month':  1, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  452605, 'hinduLunarAstro': { 'year': 1296, 'month': 12, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  470160, 'hinduLunarAstro': { 'year': 1345, 'month':  1, 'monthLeap': false, 'day': 23, 'dayLeap': false } },
  { 'rataDie':  473837, 'hinduLunarAstro': { 'year': 1355, 'month':  2, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  507850, 'hinduLunarAstro': { 'year': 1448, 'month':  4, 'monthLeap': false, 'day':  1, 'dayLeap': false } },
  { 'rataDie':  524156, 'hinduLunarAstro': { 'year': 1492, 'month': 11, 'monthLeap': false, 'day':  7, 'dayLeap': false } },
  { 'rataDie':  544676, 'hinduLunarAstro': { 'year': 1549, 'month':  2, 'monthLeap': true,  'day':  4, 'dayLeap': false } },
  { 'rataDie':  567118, 'hinduLunarAstro': { 'year': 1610, 'month':  7, 'monthLeap': false, 'day':  2, 'dayLeap': false } },
  { 'rataDie':  569477, 'hinduLunarAstro': { 'year': 1616, 'month': 11, 'monthLeap': false, 'day': 29, 'dayLeap': false } },
  { 'rataDie':  601716, 'hinduLunarAstro': { 'year': 1705, 'month':  3, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  613424, 'hinduLunarAstro': { 'year': 1737, 'month':  4, 'monthLeap': false, 'day':  5, 'dayLeap': false } },
  { 'rataDie':  626596, 'hinduLunarAstro': { 'year': 1773, 'month':  5, 'monthLeap': false, 'day':  6, 'dayLeap': false } },
  { 'rataDie':  645554, 'hinduLunarAstro': { 'year': 1825, 'month':  4, 'monthLeap': false, 'day':  5, 'dayLeap': false } },
  { 'rataDie':  664224, 'hinduLunarAstro': { 'year': 1876, 'month':  5, 'monthLeap': false, 'day': 11, 'dayLeap': false } },
  { 'rataDie':  671401, 'hinduLunarAstro': { 'year': 1896, 'month':  1, 'monthLeap': false, 'day': 13, 'dayLeap': false } },
  { 'rataDie':  694799, 'hinduLunarAstro': { 'year': 1960, 'month':  1, 'monthLeap': false, 'day': 22, 'dayLeap': false } },
  { 'rataDie':  704424, 'hinduLunarAstro': { 'year': 1986, 'month':  5, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  708842, 'hinduLunarAstro': { 'year': 1998, 'month':  7, 'monthLeap': false, 'day':  9, 'dayLeap': false } },
  { 'rataDie':  709409, 'hinduLunarAstro': { 'year': 2000, 'month':  1, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  709580, 'hinduLunarAstro': { 'year': 2000, 'month':  7, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  727274, 'hinduLunarAstro': { 'year': 2048, 'month': 12, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  728714, 'hinduLunarAstro': { 'year': 2052, 'month': 12, 'monthLeap': false, 'day':  7, 'dayLeap': false } },
  { 'rataDie':  744313, 'hinduLunarAstro': { 'year': 2095, 'month':  8, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  764652, 'hinduLunarAstro': { 'year': 2151, 'month':  4, 'monthLeap': false, 'day':  6, 'dayLeap': false } }
];

describe ('Hindu Lunar Astro calendar spec', () => {
  let date, expected, actual, julian;

  it ('should convert a Hindu Lunar Astro date to Julian day', () => {
    data4.forEach (dt => {
      julian = dt.rataDie + J0000;
      date   = dt.hinduLunarAstro;
      actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);
      expect (julian).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Astro date', () => {
    data4.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.hinduLunarAstro;
      expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'monthLeap': date.monthLeap, 'day': date.day, 'dayLeap': date.dayLeap };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.monthLeap).to.be.equal (actual.monthLeap);
      // expect (expected.day).to.be.equal (actual.day);
      // expect (expected.dayLeap).to.be.equal (actual.dayLeap);
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (1549,  0, false,  1, false)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1549, 13, false,  1, false)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1549,  2, true ,  3, false)).not.to.throw ();
    expect (() => cal.toJdn (1549,  9, true ,  1, false)).to.throw ('Invalid leap month');
    expect (() => cal.toJdn (1549,  2, true ,  1, false)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1549,  4, false,  0, false)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1549,  4, false, 31, false)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1549,  6, false, 17, true )).to.throw ('Invalid leap day');
  });
});