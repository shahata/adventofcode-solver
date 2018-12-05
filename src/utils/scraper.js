const fetch = require('node-fetch');
const dayName = require('./day-name');

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

async function getQuestionPage(year, day) {
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

module.exports = { getDayInput, getQuestionPage, getYearPage };
