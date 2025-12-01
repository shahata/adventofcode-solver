import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";

import { dayName, isDayName } from "./day-name.js";
import { calcLeaderboard } from "./calc-leaderboard.js";
import {
  getDayInput,
  getYearPage,
  getEventsPage,
  getLeaderboardJsons,
  downloadStatic,
} from "./scraper.js";
import timeoutConfirm from "@shahata/inquirer-timeout-confirm-prompt";

function renderTemplate(year, name, extension, model) {
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  let src = path.resolve(__dirname, "..");
  let templates = path.resolve(src, "..", "templates");
  let template = path.join(templates, isDayName(name) ? "day" : name);
  let fileName = `${path.join(src, year, name)}.${extension}`;
  let result = Object.keys(model).reduce(
    (result, key) => result.replaceAll(`{{${key}}}`, model[key]),
    readFileSync(`${template}.template.${extension}`).toString(),
  );
  writeFileSync(fileName, result);
  return fileName;
}

export async function downloadInput(year, day) {
  let input = await getDayInput(year, day);
  return renderTemplate(year, dayName(day), "txt", { input });
}

export let downloadIndexTicks = 6;
export async function downloadIndex(year, bar, stars) {
  downloadStatic("https://adventofcode.com/static/style.css");
  bar.tick();
  downloadStatic("https://adventofcode.com/static/highcontrast.css");
  bar.tick();
  downloadStatic("https://adventofcode.com/favicon.png");
  bar.tick();
  renderTemplate(year, "solver", "html", { year, stars });
  bar.tick();
  let page = await getYearPage(year);
  renderTemplate(year, "index", "html", { year, page, stars });
  bar.tick();
  let events = await getEventsPage(year);
  renderTemplate(year, "events", "html", { year, page: events, stars });
  bar.tick();
  let lbmodel = calcLeaderboard(await getLeaderboardJsons(year));
  renderTemplate(year, "leaderboard", "html", { year, ...lbmodel, stars });
  renderTemplate(year, "leaderboard", "json", { year, ...lbmodel, stars });
}

export async function createSolver(year, day) {
  let page = await getYearPage(year);
  let actual = page.match(new RegExp(`key = "${year}-(\\d+)-"`))?.[1];
  if (actual === day && page.match(/server_eta = (\d+)/)) {
    let [, eta] = page.match(/server_eta = (\d+)/);
    let create = await timeoutConfirm({
      message: `Create solver ${year}/${dayName(day)}?`,
      timeout: +eta,
      timeoutTips: t => `(${new Date(t * 1000).toISOString().slice(11, 19)})`,
    });
    if (!create) return;
  }

  let txtFileName = await downloadInput(year, day);
  let jsFileName = renderTemplate(year, dayName(day), "js", {});
  let testFileName = renderTemplate(year, dayName(day), "test.js", {
    year,
    day: dayName(day),
  });
  [jsFileName, testFileName, txtFileName].forEach(fn =>
    console.log(`Created ${fn}`),
  );
  console.log("");
}
