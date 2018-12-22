import { BalinesePawukonCalendar as cal } from '../../calendar/BalinesePawukonCalendar';

const dates = [
  { jdn: 1507231.5, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 1, pancawara: 3, sadwara: 1, saptawara: 1, asatawara: 5, sangawara: 7, dasawara: 3 } },
  { jdn: 1660037.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 4, sadwara: 5, saptawara: 4, asatawara: 5, sangawara: 5, dasawara: 2 } },
  { jdn: 1746893.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 5, sadwara: 5, saptawara: 4, asatawara: 1, sangawara: 5, dasawara: 6 } },
  { jdn: 1770641.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 1, asatawara: 3, sangawara: 5, dasawara: 3 } },
  { jdn: 1892731.5, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 3, pancawara: 3, sadwara: 1, saptawara: 4, asatawara: 3, sangawara: 1, dasawara: 5 } },
  { jdn: 1931579.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 1, sadwara: 5, saptawara: 2, asatawara: 1, sangawara: 8, dasawara: 0 } },
  { jdn: 1974851.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 7, asatawara: 3, sangawara: 2, dasawara: 7 } },
  { jdn: 2091164.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 2, pancawara: 1, sadwara: 2, saptawara: 1, asatawara: 2, sangawara: 2, dasawara: 1 } },
  { jdn: 2121509.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 1, pancawara: 1, sadwara: 5, saptawara: 1, asatawara: 1, sangawara: 8, dasawara: 1 } },
  { jdn: 2155779.5, date: { luang: true,  dwiwara: 2, triwara: 3, caturwara: 1, pancawara: 1, sadwara: 3, saptawara: 6, asatawara: 1, sangawara: 3, dasawara: 2 } },
  { jdn: 2174029.5, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 1, pancawara: 1, sadwara: 1, saptawara: 7, asatawara: 5, sangawara: 1, dasawara: 5 } },
  { jdn: 2191584.5, date: { luang: true,  dwiwara: 2, triwara: 3, caturwara: 4, pancawara: 1, sadwara: 6, saptawara: 6, asatawara: 8, sangawara: 6, dasawara: 2 } },
  { jdn: 2195261.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 1, asatawara: 3, sangawara: 5, dasawara: 3 } },
  { jdn: 2229274.5, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 4, pancawara: 1, sadwara: 4, saptawara: 1, asatawara: 4, sangawara: 7, dasawara: 1 } },
  { jdn: 2245580.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 2, pancawara: 2, sadwara: 2, saptawara: 4, asatawara: 2, sangawara: 5, dasawara: 7 } },
  { jdn: 2266100.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 4, pancawara: 2, sadwara: 2, saptawara: 7, asatawara: 8, sangawara: 8, dasawara: 9 } },
  { jdn: 2288542.5, date: { luang: true,  dwiwara: 2, triwara: 1, caturwara: 4, pancawara: 4, sadwara: 4, saptawara: 7, asatawara: 4, sangawara: 7, dasawara: 4 } },
  { jdn: 2290901.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 7, asatawara: 3, sangawara: 2, dasawara: 7 } },
  { jdn: 2323140.5, date: { luang: false, dwiwara: 1, triwara: 3, caturwara: 4, pancawara: 2, sadwara: 6, saptawara: 4, asatawara: 8, sangawara: 3, dasawara: 7 } },
  { jdn: 2334848.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 5, sadwara: 2, saptawara: 1, asatawara: 4, sangawara: 5, dasawara: 4 } },
  { jdn: 2348020.5, date: { luang: true,  dwiwara: 2, triwara: 1, caturwara: 2, pancawara: 2, sadwara: 4, saptawara: 6, asatawara: 2, sangawara: 1, dasawara: 6 } },
  { jdn: 2366978.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 5, sadwara: 2, saptawara: 1, asatawara: 4, sangawara: 5, dasawara: 4 } },
  { jdn: 2385648.5, date: { luang: false, dwiwara: 1, triwara: 3, caturwara: 4, pancawara: 5, sadwara: 6, saptawara: 2, asatawara: 8, sangawara: 3, dasawara: 3 } },
  { jdn: 2392825.5, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 1, pancawara: 2, sadwara: 1, saptawara: 4, asatawara: 5, sangawara: 4, dasawara: 7 } },
  { jdn: 2416223.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 5, sadwara: 5, saptawara: 1, asatawara: 5, sangawara: 8, dasawara: 4 } },
  { jdn: 2425848.5, date: { luang: true,  dwiwara: 2, triwara: 3, caturwara: 2, pancawara: 5, sadwara: 6, saptawara: 1, asatawara: 2, sangawara: 3, dasawara: 4 } },
  { jdn: 2430266.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 2, pancawara: 3, sadwara: 2, saptawara: 2, asatawara: 2, sangawara: 1, dasawara: 2 } },
  { jdn: 2430833.5, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 5, sadwara: 5, saptawara: 2, asatawara: 3, sangawara: 2, dasawara: 3 } },
  { jdn: 2431004.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 1, sadwara: 2, saptawara: 5, asatawara: 4, sangawara: 8, dasawara: 4 } },
  { jdn: 2448698.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 2, pancawara: 5, sadwara: 2, saptawara: 3, asatawara: 2, sangawara: 8, dasawara: 2 } },
  { jdn: 2450138.5, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 5, sadwara: 2, saptawara: 1, asatawara: 4, sangawara: 5, dasawara: 4 } },
  { jdn: 2465737.5, date: { luang: true,  dwiwara: 2, triwara: 1, caturwara: 3, pancawara: 4, sadwara: 1, saptawara: 4, asatawara: 7, sangawara: 1, dasawara: 2 } },
  { jdn: 2486076.5, date: { luang: false, dwiwara: 1, triwara: 3, caturwara: 4, pancawara: 3, sadwara: 6, saptawara: 1, asatawara: 8, sangawara: 6, dasawara: 3 } },
];

describe('Balinese Pawukon calendar spec', () => {
  it ('should convert a Julian day to a Balinese Pawukon date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.luang).toBe (actual.isLuag());
      expect (expected.dwiwara).toBe (actual.getDwiwara());
      expect (expected.triwara).toBe (actual.getTriwara());
      expect (expected.caturwara).toBe (actual.getCaturwara());
      expect (expected.pancawara).toBe (actual.getPancawara());
      expect (expected.sadwara).toBe (actual.getSadwara());
      expect (expected.saptawara).toBe (actual.getSaptawara());
      expect (expected.asatawara).toBe (actual.getAsatawara());
      expect (expected.sangawara).toBe (actual.getSangawara());
      expect (expected.dasawara).toBe (actual.getDasawara());
    });
  });

});
