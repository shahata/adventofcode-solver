const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const inquirer = require('inquirer');

async function getDayInput(year, day, session) {
  const index = parseInt(day.slice(-2));
  const response = await fetch(`http://adventofcode.com/${year}/day/${index}/input`, {
    headers: {
      Cookie: `session=${session}`
    }
  });
  return await response.text();
}

async function solveDay(year, day, fn, session) {
  const input = await getDayInput(year, day, session);
  console.log(`Solution for ${day}!!!`);
  console.log('----------------------------');
  const result = fn(input.trim());
  console.log(`Part1: ${result[0]}`);
  console.log(`Part2: ${result[1]}`);
  console.log('');
}

function getSolvers(year) {
  try {
    const folder = path.join(__dirname, year, 'solutions');
    const days = fs.readdirSync(folder).filter(x => x.match(/^day\d+\.js$/));
    return days.reduce((obj, day) => Object.assign(obj, {
      [day.split('.').shift()]: require(`./${path.join(`${year}/solutions`, day)}`).day
    }), {});
  } catch (e) {
    console.error(e);
    console.error(`must pass year in first argument. ${year} is not a valid year`);
    process.exit(1);
  }
}

function render(year, day, str) {
  return str.replace(/template/g, day).replace(/year/g, year);
}

async function createSolver(year, day, session) {
  const answers = await inquirer.prompt([{type: 'confirm', name: 'create', message: `Create solver ${year}/${day}?`}]);
  if (answers.create) {
    const prefix = path.join(__dirname, year, 'solutions', day);
    const template = path.join(__dirname, 'template', 'template');
    fs.writeFileSync(`${prefix}.js`, render(year, day, fs.readFileSync(`${template}.template`).toString()));
    console.log(`Created ${prefix}.js`);
    fs.writeFileSync(`${prefix}.spec.js`, render(year, day, fs.readFileSync(`${template}.spec.template`).toString()));
    console.log(`Created ${prefix}.spec.js`);
    fs.writeFileSync(`${prefix}.txt`, await getDayInput(year, day, session));
    console.log(`Created ${prefix}.txt`);
  }
}

async function solveAll(session) {
  const solvers = getSolvers(process.argv[2]);
  if (process.argv[3]) {
    const dayName = num => `day${num.length === 1 ? '0' : ''}${num}`;
    const day = dayName(process.argv[3]);
    if (solvers[day]) {
      await solveDay(process.argv[2], day, solvers[day], session);
    } else {
      await createSolver(process.argv[2], day, session);
    }
  } else {
    await Object.keys(solvers).reduce(async (prev, key) => {
      await prev;
      await solveDay(process.argv[2], key, solvers[key], session);
    }, Promise.resolve());
  }
}

module.exports = solveAll;
