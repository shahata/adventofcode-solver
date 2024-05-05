import * as path from 'node:path';
import * as process from 'node:process';
import { Buffer } from 'node:buffer';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dayName } from './day-name.js';

async function downloadRequest(url, postPayload) {
  let headers = { Cookie: `session=${process.env.ADVENT_SESSION}` };
  let options = { headers };
  if (postPayload) {
    Object.assign(options, {
      body: postPayload,
      method: 'POST',
    });
    Object.assign(options.headers, {
      'content-type': 'application/x-www-form-urlencoded',
    });
  }
  let response = await fetch(url, options);
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
  let response = await downloadRequest(url, postPayload);
  return await response.text();
}

export async function downloadStatic(url) {
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  let src = path.resolve(__dirname, '..', '..', 'static');
  let fileName = path.join(src, url.split('/').pop());
  let response = await downloadRequest(url);
  if (response.headers.get('Content-Type') === 'image/png') {
    writeFileSync(fileName, Buffer.from(await response.arrayBuffer()));
  } else {
    writeFileSync(fileName, await response.text());
  }
}

export async function getDayInput(year, day) {
  let url = `https://adventofcode.com/${year}/day/${day}/input`;
  return await downloadContent(url);
}

export async function getQuestionPage(year, day) {
  let url = `https://adventofcode.com/${year}/day/${day}`;
  let text = await downloadContent(url);
  let question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question
    .replace(/href="\/\d+"/g, 'href="index.html"')
    .replace(/href="\d+\/input"/g, `href="${dayName(day)}.txt"`)
    .replace(/href="(\d+)"/g, (full, num) => `href="${dayName(num)}.html"`)
    .replace('method="post"', 'method="get"')
    .replace(/action="[^"]*"/g, 'action="end.html"');
}

export async function getYearPage(year) {
  let text = await downloadContent(`https://adventofcode.com/${year}`);
  let page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page.replace(
    /href="\/\d+\/day\/(\d+)"/g,
    (full, num) => `href="${dayName(num)}.html"`,
  );
}

export async function getEventsPage(year) {
  let text = await downloadContent(`https://adventofcode.com/${year}/events`);
  let page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page
    .replace(/href="[^"]*">\[(\d+)\]/g, 'href="../$1/solver.html">[$1]')
    .replace(/href="\/\d+\/support"/g, '');
}

export async function getEndPage(year) {
  let url = `https://adventofcode.com/${year}/day/25/answer`;
  let text = await downloadContent(url, 'level=2&answer=0');
  let question = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return question.replace(/href="\/\d+"/g, 'href="index.html"');
}

export async function getLeaderboardJsons(year) {
  let url = `https://adventofcode.com/${year}/leaderboard/private`;
  let text = await downloadContent(url);
  let jsons = [];
  for (let [, id] of text.matchAll(/\/leaderboard\/private\/view\/(\d+)/g)) {
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
