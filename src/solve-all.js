const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const inquirer = require('inquirer');

const dayName = num => `day${num.length === 1 ? '0' : ''}${num}`;

async function downloadText(url, session) {
  const response = await fetch(url, {
    headers: {
      Cookie: `session=${session}`
    }
  });
  return await response.text();
}

async function getDayInput(year, day, session) {
  const index = parseInt(day.slice(-2));
  return await downloadText(`http://adventofcode.com/${year}/day/${index}/input`, session);
}

async function getDayQuestion(year, day, session) {
  const index = parseInt(day.slice(-2));
  const text = await downloadText(`http://adventofcode.com/${year}/day/${index}`, session);
  const question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question.replace(`/${year}`, 'index.html').replace(/\d+\/input/, `${day}.txt`).replace(/href="(\d+)"/g, (full, num) => `href="${dayName(num)}.html"`);
}

async function getYearPage(year, session) {
  const text = await downloadText(`http://adventofcode.com/${year}`, session);
  const page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page.replace(/href="\/\d+\/day\/(\d+)"/g, (full, num) => `href="${dayName(num)}.html"`);
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
    const folder = path.join(__dirname, year);
    const days = fs.readdirSync(folder).filter(x => x.match(/^day\d+\.js$/));
    return days.reduce((obj, day) => Object.assign(obj, {
      [day.split('.').shift()]: require(`./${path.join(`${year}`, day)}`).day
    }), {});
  } catch (e) {
    console.error(e);
    console.error(`must pass year in first argument. ${year} is not a valid year`);
    process.exit(1);
  }
}

function render(path, model) {
  const str = fs.readFileSync(path).toString();
  return Object.keys(model).reduce((result, key) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), model[key]);
  }, str);
}

async function createSolver(year, day, session) {
  const answers = await inquirer.prompt([{type: 'confirm', name: 'create', message: `Create solver ${year}/${day}?`}]);
  if (answers.create) {
    const prefix = path.join(__dirname, year, day);
    const template = path.join(__dirname, 'template', 'day');
    fs.writeFileSync(`${prefix}.js`, render(`${template}.js.template`, {year, day}));
    console.log(`Created ${prefix}.js`);
    fs.writeFileSync(`${prefix}.spec.js`, render(`${template}.spec.js.template`, {year, day}));
    console.log(`Created ${prefix}.spec.js`);
    fs.writeFileSync(`${prefix}.txt`, await getDayInput(year, day, session));
    console.log(`Created ${prefix}.txt`);
  }
}

async function downloadQuestion(year, day, session) {
  const question = await getDayQuestion(year, day, session);
  const prefix = path.join(__dirname, year, day);
  const template = path.join(__dirname, 'template', 'day');
  fs.writeFileSync(`${prefix}.html`, render(`${template}.html.template`, {question, year, number: parseInt(day.slice(-2), 10)}));
}

async function downloadYearPage(year, session) {
  const page = await getYearPage(year, session);
  const prefix = path.join(__dirname, year, 'index');
  const template = path.join(__dirname, 'template', 'index');
  fs.writeFileSync(`${prefix}.html`, render(`${template}.html.template`, {page, year}));
}

async function solveAll(session) {
  const solvers = getSolvers(process.argv[2]);
  if (process.argv[3]) {
    const day = dayName(process.argv[3]);
    if (solvers[day]) {
      await downloadQuestion(process.argv[2], day, session);
      await solveDay(process.argv[2], day, solvers[day], session);
    } else {
      await createSolver(process.argv[2], day, session);
    }
  } else {
    await downloadYearPage(process.argv[2], session);
    await Object.keys(solvers).reduce(async (prev, day) => {
      await prev;
      await downloadQuestion(process.argv[2], day, session);
      await solveDay(process.argv[2], day, solvers[day], session);
    }, Promise.resolve());
  }
}

module.exports = solveAll;
