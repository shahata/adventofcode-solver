import * as path from "node:path";
import * as process from "node:process";
import { Buffer } from "node:buffer";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

async function downloadRequest(url, postPayload) {
  const headers = { Cookie: `session=${process.env.ADVENT_SESSION}` };
  const options = { headers };
  if (postPayload) {
    Object.assign(options, {
      body: postPayload,
      method: "POST",
    });
    Object.assign(options.headers, {
      "content-type": "application/x-www-form-urlencoded",
    });
  }
  const response = await fetch(url, options);
  if (response.status >= 400) {
    throw new Error(
      [
        `Failed to download from ${url} (${response.status})`,
        `Description: ${await response.text()}`,
      ].join("\n"),
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
  const src = path.resolve(__dirname, "..", "..", "static");
  const fileName = path.join(src, url.split("/").pop());
  const response = await downloadRequest(url);
  if (response.headers.get("Content-Type") === "image/png") {
    writeFileSync(fileName, Buffer.from(await response.arrayBuffer()));
  } else {
    writeFileSync(fileName, await response.text());
  }
}

export async function getDayInput(year, day) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  return await downloadContent(url);
}

export async function getYearPage(year) {
  const text = await downloadContent(`https://adventofcode.com/${year}`);
  const page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page.replace(/href="\/\d+\/day\/\d+"/g, `href="solver.html"`);
}

export async function getEventsPage(year) {
  const text = await downloadContent(`https://adventofcode.com/${year}/events`);
  const page = text.match(/<main>([^]*)<\/main>/)[1].trim();
  return page
    .replace(/href="[^"]*">\[(\d+)\]/g, 'href="../$1/solver.html">[$1]')
    .replace(/href="\/\d+\/support"/g, "");
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
