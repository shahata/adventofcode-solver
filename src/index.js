const solveAll = require('./utils/solver');

if (process.env.ADVENT_SESSION) {
  let year = process.argv[2];
  let day = process.argv[3];
  if (process.argv[2] && process.argv[2].includes('/')) {
    const clean = process.argv[2].split('/').slice(-2);
    year = parseInt(clean[0]);
    day = parseInt(clean[1].replace('day', ''));
    if (Number.isNaN(year) || Number.isNaN(day)) {
      console.error('Invalid arguments');
      process.exit(0);
    }
  }
  solveAll(`${year}`, day && `${day}`).catch(err => console.error(err.stack));
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
