const fetch = require('node-fetch');
const { dayName } = require('./day-name');

async function downloadText(url, postPayload) {
  const headers = { Cookie: `session=${process.env.ADVENT_SESSION}` };
  const options = { headers };
  if (postPayload) {
    Object.assign(options, {
      body: postPayload,
      method: 'POST',
    });
    Object.assign(options.headers, {
      'content-type': 'application/x-www-form-urlencoded',
    });
  }
  const response = await fetch(url, options);
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
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  return await downloadText(url);
}

async function getQuestionPage(year, day) {
  const url = `https://adventofcode.com/${year}/day/${day}`;
  const text = await downloadText(url);
  const question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question
    .replace(`/${year}`, 'index.html')
    .replace(/\d+\/input/, `${dayName(day)}.txt`)
    .replace(/href="(\d+)"/g, (full, num) => `href="${dayName(num)}.html"`)
    .replace(/action="[^"]*"/g, 'action="end.html"');
}

async function getYearPage(year) {
  const text = await downloadText(`https://adventofcode.com/${year}`);
  const page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page.replace(
    /href="\/\d+\/day\/(\d+)"/g,
    (full, num) => `href="${dayName(num)}.html"`,
  );
}

async function getEndPage(year) {
  const url = `https://adventofcode.com/${year}/day/25/answer`;
  const text = await downloadText(url, 'level=2&answer=0');
  const question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question.replace(`/${year}`, 'index.html');
}

module.exports = { getDayInput, getQuestionPage, getYearPage, getEndPage };
