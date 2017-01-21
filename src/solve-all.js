/* global console, process */
'use strict';

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function getDayInput(year, index, session) {
  const response = await fetch(`http://adventofcode.com/${year}/day/${index}/input`, {
    headers: {
      Cookie: `session=${session}`
    }
  });
  return await response.text();
}

async function solveDay(year, index, fn, session) {
  const input = await getDayInput(year, index, session);
  console.log(`Solution for day ${index}!!!`);
  console.log('----------------------------');
  const result = fn(input.trim());
  console.log(`Part1: ${result[0]}`);
  console.log(`Part2: ${result[1]}`);
  console.log('');
}

function getSolvers(year) {
  try {
    const folder = path.join(__dirname, `${year}/solutions`);
    const days = fs.readdirSync(folder).filter(x => x.match(/^day\d+\.js$/));
    return days.reduce((obj, day) => Object.assign(obj, {
      [day]: require(`./${path.join(`${year}/solutions`, day)}`).day
    }), {});
  } catch (e) {
    console.error(e);
    console.error(`must pass year in first argument. ${year} is not a valid year`);
    process.exit(1);
  }
}

async function solveAll(session) {
  const solvers = getSolvers(process.argv[2]);
  const keys = Object.keys(solvers);
  for (let i = 0; i < keys.length; i++) {
    if (!process.argv[3] || parseInt(process.argv[3], 10) === i + 1) {
      await solveDay(process.argv[2], i + 1, solvers[keys[i]], session);
    }
  }
}

module.exports = solveAll;
