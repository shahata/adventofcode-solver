const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { getDayInput } = require('./scraper');
const { downloadQuestion, downloadIndex, createSolver } = require('./renderer');

const dayName = num => `day${num.padStart(2, '0')}`;

function solverFunction(year, day) {
  try {
    const module = require(`../${year}/${dayName(day)}`);
    return async () => {
      const input = (await getDayInput(year, day)).trimRight();
      await downloadQuestion(year, day);
      console.log(`Solution for ${year}/${dayName(day)}!!!`);
      console.log('----------------------------');
      if (module.day) {
        const { part1, part2 } = module.day(input);
        console.log(`Part1: ${part1}`);
        console.log(`Part2: ${part2}`);
      } else {
        console.log(`Part1: ${module.part1(input)}`);
        console.log(`Part2: ${module.part2(input)}`);
      }
      console.log('');
    };
  } catch (e) {
    return undefined;
  }
}

function getSolvers(year) {
  try {
    return fs
      .readdirSync(path.resolve(__dirname, '..', year))
      .filter(x => x.match(/^day\d+\.js$/))
      .map(x => solverFunction(year, `${parseInt(x.match(/\d+/).shift())}`));
  } catch (e) {
    console.error(e);
    console.error(
      `must pass year in first argument. ${year} is not a valid year`,
    );
    process.exit(1);
  }
}

async function solveAll(year, day) {
  if (day) {
    const solver = solverFunction(year, day);
    if (solver) {
      await solver();
      execSync(`npm test -- ${year}/${dayName(day)} --colors`);
    } else {
      await createSolver(year, day);
    }
  } else {
    const solvers = getSolvers(year, day);
    await downloadIndex(year);
    await solvers.reduce(async (prev, solver) => {
      await prev;
      await solver();
    }, Promise.resolve());
  }
}

module.exports = solveAll;