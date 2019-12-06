import fs from 'fs';
import url from 'url';
import path from 'path';
import solveAll from './utils/solver.js';

async function solveAllYears() {
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const years = fs.readdirSync(__dirname).filter(x => x.match(/^\d\d\d\d$/));
  for (const year of years) {
    await solveAll(year, undefined, false);
  }
}
if (process.env.ADVENT_SESSION) {
  let year = process.argv[2];
  let day = process.argv[3];
  if (process.argv[2] && process.argv[2].includes('/')) {
    const clean = process.argv[2].split('/').slice(-2);
    year = parseInt(clean[0]);
    day = parseInt(clean[1].match(/\d+/).pop());
    if (Number.isNaN(year) || Number.isNaN(day)) {
      console.error('Invalid arguments');
      process.exit(0);
    }
  }
  if (year) {
    solveAll(`${year}`, day && `${day}`).catch(err => console.error(err.stack));
  } else {
    solveAllYears().catch(err => console.error(err.stack));
  }
} else {
  console.error('************************************************************');
  console.error('************************************************************');
  console.error('**                                                        **');
  console.error('** You must set environment variable named ADVENT_SESSION **');
  console.error('** with the session cookie value from adventofcode        **');
  console.error('**                                                        **');
  console.error('************************************************************');
  console.error('************************************************************');
  console.error('');
  process.exit(0);
}
