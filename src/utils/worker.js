import { dayName } from "./day-name.js";
import { aocSolverServer } from "./urls.js";

let duration;
async function timerify(fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  duration = `(${Math.round(end - start)}ms)`;
  return result;
}

async function readInput(session, year, day) {
  let url = `${aocSolverServer}/input/${year}/${day}?session=${session}`;
  if (!session) {
    let fileName = `${year}/${dayName(day)}`;
    url = new URL(`../${fileName}.txt`, self["workerShimUrl"]).toString();
  }
  let result = await fetch(url);
  if (result.status !== 200) {
    throw `Could not download input!\n${await result.text()}`;
  }
  return (await result.text()).trimEnd();
}

async function readAnswers(session, year, day) {
  let url = `${aocSolverServer}/answer/${year}/${day}?session=${session}`;
  let result = await fetch(url);
  return result.status === 200 ? await result.json() : [];
}

async function form(session, year, day, level, answer, duration) {
  let answers = session && (await readAnswers(session, year, day));
  let submitter = '<input type="submit" value="[Submit]">';
  if (!session || answers[level - 1] === `${answer}`) {
    submitter = "";
  } else if (answers[level - 1] !== undefined) {
    submitter = `However, you've apparently entered ${answers[level - 1]} :/`;
  } else if (level === 2 && answers.length === 0) {
    submitter = '<input type="submit" value="[Submit]" disabled="disabled">';
  }
  return [
    '<form id="submitter" action="#">',
    `<input id="session" type="hidden" value="${session}">`,
    `<input id="year" type="hidden" value="${year}">`,
    `<input id="day" type="hidden" value="${day}">`,
    `<input id="level" type="hidden" value="${level}">`,
    `<input id="answer" type="hidden" value="${answer}">`,
    `Part${level}: <code>${answer}</code> ${duration} ${submitter}`,
    "</form>",
  ].join("");
}

async function solver(session, year, day) {
  let submit = (level, answer, duration = "") =>
    form(session, year, `${day}`, level, answer, duration);
  let fileName = `${year}/${dayName(`${day}`)}`;
  let module;
  try {
    module = await import(`../${fileName}.js`);
  } catch {
    return false;
  }
  let url = `https://github.com/shahata/adventofcode-solver/blob/master/src/${fileName}.js`;
  console.log(
    `<br><span><a href="${url}" target="_blank">Solution for ${fileName}!!!</a></span><br>`,
  );
  console.log("----------------------------");
  let input = await readInput(session, year, `${day}`);
  if (module.day) {
    let { part1, part2 } = await timerify(() => module.day(input));
    console.log(await submit(1, part1));
    console.log(await submit(2, part2, duration));
  } else {
    let part1 = await timerify(() => module.part1(input));
    console.log(await submit(1, part1, duration));
    let part2 = await timerify(() => module.part2(input));
    console.log(await submit(2, part2, duration));
  }
  return day + 1;
}

async function solveAll(session, year, day) {
  while (day) {
    try {
      self.postMessage({ type: "day", day });
      day = await solver(session, year, day);
    } catch (e) {
      console.log(e);
      console.log("Please retry once issue is resolved");
    }
  }
}

self.window = self; //hack so that node-forge will work in the worker
self.onmessage = async e => {
  await solveAll(e.data.session, e.data.year, e.data.day);
  self.postMessage({ type: "done" });
};
console.log = (...args) => {
  let str = args.map(x => `${x}`).join(" ");
  self.postMessage({ type: "log", log: str });
};
self.postMessage({ type: "ready" });
