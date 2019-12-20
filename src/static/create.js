/*global document, window, WorkerShim */
import { solveAll } from './solver.js';

function runWorker(year, session) {
  return new Promise(resolve => {
    if (window.SolverWorker) {
      window.SolverWorker.terminate();
    }
    document.getElementById('output').innerText = '';

    const u = s => new URL(s, window.location);
    const worker = new WorkerShim('../static/worker.js', {
      type: 'module',
      importMap: {
        imports: {
          'js-combinatorics': u('../static/combinatorics.js'),
          'child_process': u('../static/child_process.js'),
          'crypto': u('../static/crypto.js'),
          'vm': u('../static/vm.js'),
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
    worker.onerror = async e => {
      if (e.message.includes('https://crbug.com/680046')) {
        await solveAll(year, session);
        resolve();
      }
    };
    window.SolverWorker = worker;
  });
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
  const str = args.map(x => `${x}`).join(' ') + '\n';
  document.getElementById('output').innerText += str;
};
