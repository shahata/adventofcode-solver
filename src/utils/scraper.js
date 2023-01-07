import * as path from 'node:path';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dayName } from './day-name.js';

async function downloadRequest(url, postPayload) {
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
      [
        `Failed to download from ${url} (${response.status})`,
        `Description: ${await response.text()}`,
      ].join('\n'),
    );
  }
  return response;
}

async function downloadContent(url, postPayload) {
  const response = await downloadRequest(url, postPayload);
  return await response.text();
}

export async function downloadStatic(url) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const src = path.resolve(__dirname, '..', 'static');
  const fileName = path.join(src, url.split('/').pop());
  const response = await downloadRequest(url);
  if (response.headers.get('Content-Type') === 'image/png') {
    writeFileSync(fileName, Buffer.from(await response.arrayBuffer()));
  } else {
    writeFileSync(fileName, await response.text());
  }
}

export async function getDayInput(year, day) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  return await downloadContent(url);
}

export async function getQuestionPage(year, day) {
  const url = `https://adventofcode.com/${year}/day/${day}`;
  const text = await downloadContent(url);
  const question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question
    .replace(/href="\/\d+"/g, 'href="index.html"')
    .replace(/href="\d+\/input"/g, `href="${dayName(day)}.txt"`)
    .replace(/href="(\d+)"/g, (full, num) => `href="${dayName(num)}.html"`)
    .replace(/action="[^"]*"/g, 'action="end.html"');
}

export async function getYearPage(year) {
  const text = await downloadContent(`https://adventofcode.com/${year}`);
  const page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page.replace(
    /href="\/\d+\/day\/(\d+)"/g,
    (full, num) => `href="${dayName(num)}.html"`,
  );
}

export async function getEventsPage(year) {
  const text = await downloadContent(`https://adventofcode.com/${year}/events`);
  const page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page.replace(
    /href="[^"]*">\[(\d+)\]/g,
    'href="../$1/index.html">[$1]',
  );
}

export async function getEndPage(year) {
  const url = `https://adventofcode.com/${year}/day/25/answer`;
  const text = await downloadContent(url, 'level=2&answer=0');
  const question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question.replace(/href="\/\d+"/g, 'href="index.html"');
}

export async function getLeaderboardJsons(year) {
  const url = `https://adventofcode.com/${year}/leaderboard/private`;
  const text = await downloadContent(url);
  const jsons = [];
  for (const [, id] of text.matchAll(/\/leaderboard\/private\/view\/(\d+)/g)) {
    jsons.push(
      JSON.parse(
        await downloadContent(
          `https://adventofcode.com/${year}/leaderboard/private/view/${id}.json`,
        ),
      ),
    );
  }
  return jsons;
}
