/* global describe it: true */

import { expect } from 'chai';
import 'dirty-chai';
import { describe, it } from 'mocha';

import { J0000 } from '../../Const';
import { FrenchArithmeticCalendar as cal } from '../../calendar/FrenchArithmeticCalendar';

const data3 = [
  { 'rataDie': -214193, 'frenchArithmetic': { 'year': -2378, 'month': 11, 'day':  4 } },
  { 'rataDie':  -61387, 'frenchArithmetic': { 'year': -1959, 'month':  3, 'day': 13 } },
  { 'rataDie':   25469, 'frenchArithmetic': { 'year': -1721, 'month':  1, 'day':  2 } },
  { 'rataDie':   49217, 'frenchArithmetic': { 'year': -1656, 'month':  1, 'day': 10 } },
  { 'rataDie':  171307, 'frenchArithmetic': { 'year': -1322, 'month':  4, 'day': 18 } },
  { 'rataDie':  210155, 'frenchArithmetic': { 'year': -1216, 'month':  9, 'day':  1 } },
  { 'rataDie':  253427, 'frenchArithmetic': { 'year': -1097, 'month':  2, 'day': 19 } },
  { 'rataDie':  369740, 'frenchArithmetic': { 'year':  -779, 'month':  8, 'day':  4 } },
  { 'rataDie':  400085, 'frenchArithmetic': { 'year':  -696, 'month':  9, 'day':  5 } },
  { 'rataDie':  434355, 'frenchArithmetic': { 'year':  -602, 'month':  7, 'day':  1 } },
  { 'rataDie':  452605, 'frenchArithmetic': { 'year':  -552, 'month':  6, 'day': 20 } },
  { 'rataDie':  470160, 'frenchArithmetic': { 'year':  -504, 'month':  7, 'day': 13 } },
  { 'rataDie':  473837, 'frenchArithmetic': { 'year':  -494, 'month':  8, 'day':  8 } },
  { 'rataDie':  507850, 'frenchArithmetic': { 'year':  -401, 'month':  9, 'day': 23 } },
  { 'rataDie':  524156, 'frenchArithmetic': { 'year':  -356, 'month':  5, 'day': 13 } },
  { 'rataDie':  544676, 'frenchArithmetic': { 'year':  -300, 'month':  7, 'day': 19 } },
  { 'rataDie':  567118, 'frenchArithmetic': { 'year':  -239, 'month':  0, 'day':  1 } },
  { 'rataDie':  569477, 'frenchArithmetic': { 'year':  -232, 'month':  6, 'day': 14 } },
  { 'rataDie':  601716, 'frenchArithmetic': { 'year':  -144, 'month':  9, 'day': 22 } },
  { 'rataDie':  613424, 'frenchArithmetic': { 'year':  -112, 'month': 10, 'day': 12 } },
  { 'rataDie':  626596, 'frenchArithmetic': { 'year':   -76, 'month': 11, 'day':  6 } },
  { 'rataDie':  645554, 'frenchArithmetic': { 'year':   -24, 'month': 10, 'day':  1 } },
  { 'rataDie':  664224, 'frenchArithmetic': { 'year':    27, 'month': 11, 'day': 14 } },
  { 'rataDie':  671401, 'frenchArithmetic': { 'year':    47, 'month':  7, 'day':  6 } },
  { 'rataDie':  694799, 'frenchArithmetic': { 'year':   111, 'month':  7, 'day': 29 } },
  { 'rataDie':  704424, 'frenchArithmetic': { 'year':   137, 'month': 12, 'day':  7 } },
  { 'rataDie':  708842, 'frenchArithmetic': { 'year':   150, 'month':  1, 'day':  7 } },
  { 'rataDie':  709409, 'frenchArithmetic': { 'year':   151, 'month':  7, 'day': 29 } },
  { 'rataDie':  709580, 'frenchArithmetic': { 'year':   152, 'month':  1, 'day': 15 } },
  { 'rataDie':  727274, 'frenchArithmetic': { 'year':   200, 'month':  6, 'day': 27 } },
  { 'rataDie':  728714, 'frenchArithmetic': { 'year':   204, 'month':  6, 'day':  7 } },
  { 'rataDie':  744313, 'frenchArithmetic': { 'year':   247, 'month':  2, 'day': 20 } },
  { 'rataDie':  764652, 'frenchArithmetic': { 'year':   302, 'month': 11, 'day':  1 } }
];

describe ('French Arithmetic calendar spec', () => {
  let date, expected, actual, julian;

  it ('should convert a French Arithmetic date to Julian day', () => {
    data3.forEach (dt => {
      date   = dt.frenchArithmetic;
      julian = dt.rataDie + J0000;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (julian).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a French Arithmetic date', () => {
    data3.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.frenchArithmetic;
      expected = { jdn: julian, year: date.year, month: date.month, day: date.day, yearLeap: cal.isLeapYear(date.year) };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should determine whether a French Arithmetic year is leap year', () => {
    [ 4, 20, 1600, 1760, 1840, 1904, 1980, 2000 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).to.be.equal (true);
    });

    [ 0, 1, 2, 3, 5, 1000, 1599, 1700, 1800, 1900, 1970, 2001, 3000, 4000 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).to.be.equal (false);
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (1000, -1, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1000, 13, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1000,  7,  0)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1000,  7, -5)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1000,  7, 35)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1000,  0,  6)).to.throw ('Invalid day');
   });
});