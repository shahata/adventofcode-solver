import { dayName } from '../../utils/day-name.js';

let duration;
function timerify(fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  duration = `(${Math.round(end - start)}ms)`;
  return result;
}

async function readInput(session, year, day) {
  const url = `https://www.wix.com/_serverless/adventofcode/input/${year}/${day}?session=${session}`;
  const result = await fetch(url);
  if (result.status !== 200) {
    throw `Could not download input!\n${await result.text()}`;
  }
  return (await result.text()).trimRight();
}

async function readAnswers(session, year, day) {
  const url = `https://www.wix.com/_serverless/adventofcode/question/${year}/${day}?session=${session}`;
  const result = await fetch(url);
  return result.status === 200 ? await result.json() : [];
}

async function form(session, year, day, level, answer, duration) {
  const answers = await readAnswers(session, year, day);
  let submitter = '<input type="submit" value="[Submit]">';
  if (answers[level - 1] === `${answer}`) {
    submitter = '';
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
    '</form>',
  ].join('');
}

export async function solver(session, year, day) {
  const submit = (level, answer, duration = '') =>
    form(session, year, day, level, answer, duration);
  const fileName = `${year}/${dayName(day)}`;
  const url = `https://github.com/shahata/adventofcode-solver/blob/master/src/${fileName}.js`;
  console.log(
    `<br><span><a href="${url}" target="_blank">Solution for ${fileName}!!!</a></span><br>`,
  );
  console.log('----------------------------');
  const module = await import(`../../${fileName}.js`);
  const input = await readInput(session, year, day);
  if (module.day) {
    const { part1, part2 } = timerify(() => module.day(input));
    console.log(await submit(1, part1));
    console.log(await submit(2, part2, duration));
  } else {
    const part1 = timerify(() => module.part1(input));
    console.log(await submit(1, part1, duration));
    const part2 = timerify(() => module.part2(input));
    console.log(await submit(2, part2, duration));
  }
}
