import * as path from "node:path";
import * as process from "node:process";
import { fileURLToPath, resolve } from "node:url";
import { performance } from "node:perf_hooks";
import { existsSync, readdirSync, writeFileSync } from "node:fs";

import ProgressBar from "progress";
import { chromium } from "playwright";
import readInput from "./read-input.js";
import { dayName } from "./day-name.js";
import {
  downloadIndex,
  downloadInput,
  createSolver,
  downloadIndexTicks,
} from "./renderer.js";

let __dirname = path.dirname(fileURLToPath(import.meta.url));

async function timerify(fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  let duration = `(${Math.round(end - start)}ms)`;
  return { result, duration };
}

function getDays(year) {
  try {
    return readdirSync(path.resolve(__dirname, "..", year))
      .filter(x => x.match(/^day\d+\.js$/))
      .map(x => parseInt(x.match(/\d+/).shift()))
      .sort((a, b) => a - b)
      .map(x => `${x}`);
  } catch {
    console.error(`must pass valid year in first argument`);
    process.exit(0);
  }
}

function getYears() {
  let directory = path.resolve(__dirname, "..");
  let years = readdirSync(directory).filter(x => x.match(/^\d\d\d\d$/));
  return years.sort((a, b) => parseInt(a) - parseInt(b));
}

async function takeScreenshots(year) {
  if (year !== getYears().at(-1)) return;
  let browser = await chromium.launch();
  let height = 208.16 + getYears().length * 23.5;
  let clip = { x: 0, y: 0, width: 1030, height };
  let page = await browser.newPage();
  await page.goto(resolve(import.meta.url, `../${year}/events.html`));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "static/screenshot-events.png", clip });
  await page.goto(resolve(import.meta.url, `../${year}/solver.html`));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "static/screenshot-solver.png", clip });
  await browser.close();
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  let index = path.resolve(__dirname, "..", "..", "index.html");
  writeFileSync(
    index,
    `<meta http-equiv="refresh" content="0; URL=src/${year}/events.html">`,
  );
}

export async function solveDay(year, day) {
  let solver = path.resolve(__dirname, "..", year, `${dayName(day)}.js`);
  if (!existsSync(solver)) {
    return createSolver(year, day);
  }
  let moduleName = `../${year}/${dayName(day)}.js`;
  let module = await import(moduleName);
  let input = readInput(new URL(moduleName, import.meta.url));
  console.log(`Solution for ${year}/${dayName(day)}!!!`);
  console.log("----------------------------");
  let result, duration;
  if (module.day) {
    ({ result, duration } = await timerify(() => module.day(input)));
    console.log(`Part1: ${result.part1}`);
    console.log(`Part2: ${result.part2}`, duration);
  } else {
    ({ result, duration } = await timerify(() => module.part1(input)));
    console.log(`Part1: ${result}`, duration);
    ({ result, duration } = await timerify(() => module.part2(input)));
    console.log(`Part2: ${result}`, duration);
  }
  console.log("");
}

export async function solveAllDays(year, run = true) {
  console.log(`Downloading files (${year})...`);
  let days = getDays(year);
  var bar = new ProgressBar("[:bar] :percent", {
    total: (run ? days.length : 0) + downloadIndexTicks,
    width: 40,
  });
  await downloadIndex(year, bar, days.length * 2);
  if (run) {
    for (let day of days) {
      await downloadInput(year, day);
      bar.tick();
    }
  }
  await takeScreenshots(year);
  if (run) {
    for (let day of days) {
      await solveDay(year, day);
    }
  }
}

export async function solveAllYears() {
  let years = getYears();
  for (let year of years) {
    await solveAllDays(year, false);
  }
}
