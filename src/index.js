const solveAll = require('./utils/solver');

if (process.env.ADVENT_SESSION) {
  let year, day;
  if (process.argv[2].includes('/')) {
    const clean = process.argv[2].split('/').slice(-2);
    year = clean[0];
    day = clean[1].replace('day', '');
    if (!Number.isNaN(parseInt(year)) && !Number.isNaN(parseInt(day))) {
      process.argv[2] = `${year}`;
      process.argv[3] = `${day}`;
    } else {
      console.error('Invalid arguments');
      process.exit(1);
    }
  } else {
    year = process.argv[2];
    day = process.argv[3];
  }
  solveAll(year, day).catch(err => console.error(err.stack));
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
  process.exit(1);
}
