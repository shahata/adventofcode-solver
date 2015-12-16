/* global console, process */
'use strict';

import fetch from 'node-fetch';
import * as solvers from './solutions';

async function getDayInput(index, session) {
  let response = await fetch(`http://adventofcode.com/day/${index}/input`, {
    headers: {
      'Cookie': `session=${session}`
    }
  });
  return await response.text();
}

async function solveDay(index, fn, session) {
  let input = await getDayInput(index, session);
  console.log(`Solution for day ${index}!!!`);
  console.log('----------------------------');
  let result = fn(input.trim());
  console.log(`Part1: ${result[0]}`);
  console.log(`Part2: ${result[1]}`);
  console.log('');
}

export async function solveAll(session) {
  let keys = Object.keys(solvers);
  for (let i = 0; i < keys.length; i++) {
    if (!process.argv[2] || parseInt(process.argv[2], 10) === i + 1) {
      await solveDay(i + 1, solvers[keys[i]], session);
    }
  }
}