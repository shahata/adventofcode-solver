import { solveAll, solveAllYears } from './utils/solver.js';
import { execSync } from 'node:child_process';
import * as process from 'node:process';

if (!process.env.ADVENT_SESSION) {
  try {
    const session = execSync('cookies https://adventofcode.com/ session');
    process.env.ADVENT_SESSION = session.toString();
  } catch {
    //
  }
}

if (process.env.ADVENT_SESSION) {
  let year = process.argv[2];
  let day = process.argv[3];
  if (process.argv[2] && process.argv[2].includes('/')) {
    const clean = process.argv[2].split('/').slice(-2);
    const yearNum = parseInt(clean[0]);
    const dayNum = parseInt(clean[1].match(/\d+/).pop());
    if (Number.isNaN(yearNum) || Number.isNaN(dayNum)) {
      console.error('Invalid arguments');
      process.exit(0);
    }
    year = `${yearNum}`;
    day = `${dayNum}`;
  }
  if (year) {
    await solveAll(year, day).catch(err => console.error(err.stack));
  } else {
    await solveAllYears().catch(err => console.error(err.stack));
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
}
process.exit(0);
