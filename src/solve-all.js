const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const dayName = num => `day${num.padStart(2, '0')}`;

async function downloadText(url) {
  const headers = { Cookie: `session=${process.env.ADVENT_SESSION}` };
  const response = await fetch(url, { headers });
  if (response.status >= 400) {
    throw new Error(
      `Failed to download from ${url} (${
        response.status
      })\nDescription: ${await response.text()}`,
    );
  }
  return await response.text();
}

async function getDayInput(year, day) {
  const url = `http://adventofcode.com/${year}/day/${day}/input`;
  return await downloadText(url);
}

async function getDayQuestion(year, day) {
  const url = `http://adventofcode.com/${year}/day/${day}`;
  const text = await downloadText(url);
  const question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question
    .replace(`/${year}`, 'index.html')
    .replace(/\d+\/input/, `${dayName(day)}.txt`)
    .replace(/href="(\d+)"/g, (full, num) => `href="${dayName(num)}.html"`)
    .replace(/action="[^"]*"/g, 'action="end.html"');
}

async function getYearPage(year) {
  const text = await downloadText(`http://adventofcode.com/${year}`);
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

async function solveDay(year, day, fn) {
  const input = await getDayInput(year, day);
  console.log(`Solution for ${year}/${dayName(day)}!!!`);
  console.log('----------------------------');
  fn(input.trimRight());
  console.log('');
}

function getSolvers(year, day) {
  try {
    const folder = path.join(__dirname, year);
    const days = fs
      .readdirSync(folder)
      .filter(x => x.match(new RegExp(`^day0*${day || '\\d+'}\\.js$`)));
    return days.reduce(
      (obj, day) => ({
        ...obj,
        [parseInt(day.match(/\d+/).shift())]: dayFunction(
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

function renderDayTemplate(year, day, extension, model) {
  const prefix = path.join(__dirname, year, dayName(day));
  const template = path.join(__dirname, 'template', 'day');
  const fileName = `${prefix}.${extension}`;
  fs.writeFileSync(
    fileName,
    render(`${template}.${extension}.template`, model),
  );
  return fileName;
}

async function createSolver(year, day) {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'create',
      message: `Create solver ${year}/${dayName(day)}?`,
    },
  ]);
  if (answers.create) {
    const htmlFileName = await downloadQuestion(year, day);
    const jsFileName = renderDayTemplate(year, day, 'js', {});
    const specFileName = renderDayTemplate(year, day, 'spec.js', {
      year,
      day: dayName(day),
    });
    const txtFileName = renderDayTemplate(year, day, 'txt', {
      input: await getDayInput(year, day),
    });
    [htmlFileName, jsFileName, specFileName, txtFileName].forEach(fn =>
      console.log(`Created ${fn}`),
    );
    console.log('');
  }
}

async function downloadQuestion(year, day) {
  return renderDayTemplate(year, day, 'html', {
    question: await getDayQuestion(year, day),
    year,
    number: day,
  });
}

async function downloadYearPage(year) {
  const page = await getYearPage(year);
  const prefix = path.join(__dirname, year, 'index');
  const template = path.join(__dirname, 'template', 'index');
  fs.writeFileSync(
    `${prefix}.html`,
    render(`${template}.html.template`, { page, year }),
  );
}

async function solveAll(year, day) {
  const solvers = getSolvers(year, day);
  if (day) {
    if (solvers[day]) {
      await downloadQuestion(year, day);
      await solveDay(year, day, solvers[day]);
      execSync(`npm test -- ${year}/${dayName(day)} --colors`);
    } else {
      await createSolver(year, day);
    }
  } else {
    await downloadYearPage(year);
    await Object.keys(solvers).reduce(async (prev, day) => {
      await prev;
      await downloadQuestion(year, day);
      await solveDay(year, day, solvers[day]);
    }, Promise.resolve());
  }
}

module.exports = solveAll;
