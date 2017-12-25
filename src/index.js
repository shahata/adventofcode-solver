const solveAll = require('./solve-all');

if (process.env.ADVENT_SESSION) {
  solveAll(process.env.ADVENT_SESSION).catch(err => console.error(err.stack));
} else {
  console.error('********************************************************************************************************************');
  console.error('********************************************************************************************************************');
  console.error('**                                                                                                                **');
  console.error('** You must set environment variable named ADVENT_SESSION with the value of your session cookie from adventofcode **');
  console.error('**                                                                                                                **');
  console.error('********************************************************************************************************************');
  console.error('********************************************************************************************************************');
  console.error('');
  process.exit(1);
}
