const solveAll = require('./solve-all');

if (process.env.ADVENT_SESSION) {
  if (process.argv[2].includes('/')) {
    const clean = process.argv[2].split('/').slice(-2);
    const year = parseInt(clean[0]);
    const day = parseInt(clean[1].replace('day', ''));
    if (!Number.isNaN(year) && !Number.isNaN(day)) {
      process.argv[2] = `${year}`;
      process.argv[3] = `${day}`;
    } else {
      console.error('Invalid arguments');
      process.exit(1);
    }
  }
  solveAll(process.env.ADVENT_SESSION).catch(err => console.error(err.stack));
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
