const abc = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function next(prerequisites, done) {
  let options = [];
  for (let [step, prerequisite] of prerequisites) {
    if (!done.includes(step) && prerequisite.every(x => done.includes(x))) {
      options.push(step);
    }
  }
  done.push(options.sort().shift());
}

function next2(prerequisites, done, pending, workers, base) {
  let now = 0;
  if (pending.length) {
    done.push(pending.sort((a, b) => a.time - b.time).shift());
    now = done.at(-1).time;
  }

  let options = [];
  for (let [step, prerequisite] of prerequisites) {
    if (
      !done.find(x => x.step === step) &&
      !pending.find(x => x.step === step) &&
      prerequisite.every(step => done.find(x => x.step === step))
    ) {
      options.push(step);
    }
  }

  options = options
    .sort()
    .map(x => ({ step: x, time: now + base + abc.indexOf(x) }));
  while (pending.length < workers && options.length) {
    pending.push(options.shift());
  }
}

function parse(input) {
  let prerequisites = new Map();
  input
    .split("\n")
    .map(x => x.match(/([A-Z]) must be finished before step ([A-Z])/))
    .forEach(([, required, step]) => {
      prerequisites.set(step, (prerequisites.get(step) || []).concat(required));
      prerequisites.set(required, prerequisites.get(required) || []);
    });
  return prerequisites;
}

export function part1(input) {
  let done = [];
  let prerequisites = parse(input);
  let steps = Array.from(prerequisites.keys()).length;
  while (done.length < steps) {
    next(prerequisites, done);
  }
  return done.join("");
}

export function part2(input, workers = 5, base = 60) {
  let done = [];
  let pending = [];
  let prerequisites = parse(input);
  let steps = Array.from(prerequisites.keys()).length;
  while (done.length < steps) {
    next2(prerequisites, done, pending, workers, base);
  }
  return done.pop().time;
}
