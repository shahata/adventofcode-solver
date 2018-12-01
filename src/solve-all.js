const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const dayName = num => `day${num.padStart(2, '0')}`;

async function downloadText(url, session) {
  const headers = { Cookie: `session=${session}` };
  const response = await fetch(url, { headers });
  return await response.text();
}

async function getDayInput(year, day, session) {
  const index = parseInt(day.slice(-2));
  const url = `http://adventofcode.com/${year}/day/${index}/input`;
  return await downloadText(url, session);
}

async function getDayQuestion(year, day, session) {
  const index = parseInt(day.slice(-2));
  const url = `http://adventofcode.com/${year}/day/${index}`;
  const text = await downloadText(url, session);
  const question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question
    .replace(`/${year}`, 'index.html')
    .replace(/\d+\/input/, `${day}.txt`)
    .replace(/href="(\d+)"/g, (full, num) => `href="${dayName(num)}.html"`)
    .replace(/action="[^"]*"/g, 'action="end.html"');
}

async function getYearPage(year, session) {
  const text = await downloadText(`http://adventofcode.com/${year}`, session);
  const page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page.replace(
    /href="\/\d+\/day\/(\d+)"/g,
    (full, num) => `href="${dayName(num)}.html"`,
  );
}

function dayFunction(module) {
  return input => {
    input = input.trimRight();
    if (module.day) {
      const { part1, part2 } = module.day(input);
      console.log(`Part1: ${part1}`);
      console.log(`Part2: ${part2}`);
    } else {
      console.log(`Part1: ${module.part1(input)}`);
      console.log(`Part2: ${module.part2(input)}`);
    }
  };
}

async function solveDay(year, day, fn, session) {
  const input = await getDayInput(year, day, session);
  console.log(`Solution for ${year}/${day}!!!`);
  console.log('----------------------------');
  fn(input.trimRight());
  console.log('');
}

function getSolvers(year, day) {
  try {
    const folder = path.join(__dirname, year);
    const days = fs
      .readdirSync(folder)
      .filter(x => x.match(/^day\d+\.js$/) && (!day || x.includes(day)));
    return days.reduce(
      (obj, day) => ({
        ...obj,
        [day.split('.').shift()]: dayFunction(
          require(`./${path.join(`${year}`, day)}`),
        ),
      }),
      {},
    );
  } catch (e) {
    console.error(e);
    console.error(
      `must pass year in first argument. ${year} is not a valid year`,
    );
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
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'create',
      message: `Create solver ${year}/${day}?`,
    },
  ]);
  if (answers.create) {
    const prefix = path.join(__dirname, year, day);
    const template = path.join(__dirname, 'template', 'day');
    fs.writeFileSync(
      `${prefix}.js`,
      render(`${template}.js.template`, { year, day }),
    );
    console.log(`Created ${prefix}.js`);
    fs.writeFileSync(
      `${prefix}.spec.js`,
      render(`${template}.spec.js.template`, { year, day }),
    );
    console.log(`Created ${prefix}.spec.js`);
    fs.writeFileSync(`${prefix}.txt`, await getDayInput(year, day, session));
    console.log(`Created ${prefix}.txt`);
  }
}

async function downloadQuestion(year, day, session) {
  const question = await getDayQuestion(year, day, session);
  const prefix = path.join(__dirname, year, day);
  const template = path.join(__dirname, 'template', 'day');
  fs.writeFileSync(
    `${prefix}.html`,
    render(`${template}.html.template`, {
      question,
      year,
      number: parseInt(day.slice(-2), 10),
    }),
  );
}

async function downloadYearPage(year, session) {
  const page = await getYearPage(year, session);
  const prefix = path.join(__dirname, year, 'index');
  const template = path.join(__dirname, 'template', 'index');
  fs.writeFileSync(
    `${prefix}.html`,
    render(`${template}.html.template`, { page, year }),
  );
}

async function solveAll(session) {
  const year = process.argv[2];
  const day = process.argv[3] && dayName(process.argv[3]);
  const solvers = getSolvers(year, day);
  if (day) {
    if (solvers[day]) {
      await downloadQuestion(year, day, session);
      await solveDay(year, day, solvers[day], session);
      execSync(`npx jest ${year}/${day} --colors`);
    } else {
      await createSolver(year, day, session);
    }
  } else {
    await downloadYearPage(year, session);
    await Object.keys(solvers).reduce(async (prev, day) => {
      await prev;
      await downloadQuestion(year, day, session);
      await solveDay(year, day, solvers[day], session);
    }, Promise.resolve());
  }
}

module.exports = solveAll;
