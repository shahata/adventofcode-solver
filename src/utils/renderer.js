const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const dayName = require('./day-name');
const { getDayInput, getQuestionPage, getYearPage } = require('./scraper');

async function downloadQuestion(year, day) {
  const question = await getQuestionPage(year, day);
  return renderTemplate(year, day, 'html', { question, year, day });
}

async function downloadIndex(year) {
  const page = await getYearPage(year);
  renderTemplate(year, undefined, 'html', { year, page });
}

function renderTemplate(year, day, extension, model) {
  const src = path.resolve(__dirname, '..');
  const prefix = path.join(src, year, day ? dayName(day) : 'index');
  const template = path.join(src, 'template', day ? 'day' : 'index');
  const fileName = `${prefix}.${extension}`;
  const result = Object.keys(model).reduce((result, key) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), model[key]);
  }, fs.readFileSync(`${template}.${extension}.template`).toString());
  fs.writeFileSync(fileName, result);
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
    const jsFileName = renderTemplate(year, day, 'js', {});
    const specFileName = renderTemplate(year, day, 'spec.js', {
      year,
      day: dayName(day),
    });
    const txtFileName = renderTemplate(year, day, 'txt', {
      input: await getDayInput(year, day),
    });
    [htmlFileName, jsFileName, specFileName, txtFileName].forEach(fn =>
      console.log(`Created ${fn}`),
    );
    console.log('');
  }
}

module.exports = { downloadQuestion, downloadIndex, createSolver };
