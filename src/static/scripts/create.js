/* global document, window, Worker, Blob */
class WorkerShim {
  constructor(url, options) {
    const blob = URL.createObjectURL(
      new Blob(
        [
          `importScripts('https://unpkg.com/es-module-shims@1.6.3');`,
          `importShim.addImportMap(${JSON.stringify(options.importMap)});`,
          `importShim('${url}');`,
        ],
        { type: 'application/javascript' },
      ),
    );
    return new Worker(blob, Object.assign({}, options, { type: undefined }));
  }
}

function runWorker(session, year, day = 1) {
  return new Promise(resolve => {
    if (window['SolverWorker']) {
      window['SolverWorker'].terminate();
    }
    if (day === 1) {
      document.getElementById('output').innerHTML = '';
    }
    document.getElementById('skip').onsubmit = () =>
      runWorker(session, year, day + 1) && false;
    document.getElementById('loader').style.display = 'block';

    const u = s => new URL(s, window.location.toString());
    const worker = /** @type {Worker} */ (
      new WorkerShim(u('../static/scripts/worker.js'), {
        type: 'module',
        importMap: {
          imports: {
            'combinatorial-generators':
              'https://cdn.skypack.dev/combinatorial-generators@1.1.2?min',
            'node:child_process': u('../static/polyfills/child_process.js'),
            'node:crypto': u('../static/polyfills/crypto.js'),
          },
        },
      })
    );
    worker.onmessage = e => {
      if (e.data.type === 'log') {
        console.log(e.data.log);
      } else if (e.data.type === 'day') {
        day = e.data.day;
      } else if (e.data.type === 'ready') {
        worker.postMessage({ type: 'solveAll', session, year, day });
      } else if (e.data.type === 'done') {
        document.getElementById('loader').style.display = 'none';
        resolve();
      }
    };
    window['SolverWorker'] = worker;
  });
}

function cleanResult(str, year) {
  if (str.includes('fifty stars')) {
    str = str.match(/<main>([^]*)<\/main>/)[1].trim();
    str = str.replace(/<article>[^]*<\/article>/, '');
    return `<a href="https://adventofcode.com/${year}">[Go Check on Your Calendar]</a> ${str}`;
  } else {
    return str;
  }
}

async function submitAnswer(e) {
  const form = e.target;
  const session = form.querySelector('#session').value;
  const year = form.querySelector('#year').value;
  const day = form.querySelector('#day').value;
  const level = form.querySelector('#level').value;
  const answer = form.querySelector('#answer').value;
  const url = `https://www.wix.com/_serverless/adventofcode/answer/${year}/${day}?session=${session}`;
  const result = await fetch(url, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `level=${level}&answer=${encodeURIComponent(answer)}`,
    method: 'POST',
  });
  form.removeChild(e.submitter);
  form.innerHTML += cleanResult(await result.text(), year);
  if (level === '1' && form.innerHTML.includes("That's the right answer!")) {
    document
      .querySelectorAll(`input#day[value="${day}"] ~ input[type="submit"]`)
      .forEach(x => x.removeAttribute('disabled'));
  }
}

export async function run(year) {
  /** @type {HTMLInputElement} */
  const sessionElement = document.querySelector('#session');
  const session = sessionElement.value;
  sessionElement.value = '';
  sessionElement.blur();
  await runWorker(session, year);
}

console.log = (...args) => {
  const str = args.map(x => `${x}`).join(' ');
  const element = document.createElement('span');
  element.innerHTML = str;
  const children = new Array(...element.children);
  if (children.length > 0) {
    for (const x of children) {
      document.getElementById('output').appendChild(x);
    }
  } else {
    document.getElementById('output').appendChild(element);
    document.getElementById('output').appendChild(document.createElement('br'));
  }
  document
    .querySelectorAll('#submitter')
    .forEach(
      (/** @type {HTMLFormElement} */ form) =>
        (form.onsubmit = e => submitAnswer(e) && false),
    );
};
