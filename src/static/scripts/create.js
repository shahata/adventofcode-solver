/*global document, window, WorkerShim, fetch */

function runWorker(year, session) {
  return new Promise(resolve => {
    if (window.SolverWorker) {
      window.SolverWorker.terminate();
    }
    document.getElementById('output').innerHTML = '';

    const u = s => new URL(s, window.location);
    const worker = new WorkerShim('../static/scripts/worker.js', {
      type: 'module',
      importMap: {
        imports: {
          'js-combinatorics': u('../static/polyfills/combinatorics.js'),
          'child_process': u('../static/polyfills/child_process.js'),
          'crypto': u('../static/polyfills/crypto.js'),
          'vm': u('../static/polyfills/vm.js'),
        },
        scopes: {},
      },
    });
    worker.onmessage = e => {
      if (e.data.type === 'log') {
        console.log(e.data.log);
      } else if (e.data.type === 'ready') {
        worker.postMessage({ type: 'solveAll', year, session });
      } else if (e.data.type === 'done') {
        resolve();
      }
    };
    window.SolverWorker = worker;
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
  const session = document.getElementById('session').value;
  document.getElementById('session').value = '';
  document.getElementById('session').blur();
  document.getElementById('loader').style.display = 'block';
  await runWorker(year, session);
  document.getElementById('loader').style.display = 'none';
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
  }
  document
    .querySelectorAll('#submitter')
    .forEach(form => (form.onsubmit = e => submitAnswer(e) && false));
};
