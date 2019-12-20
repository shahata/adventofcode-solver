/*global document, window, WorkerShim */
import { solveAll } from './solver.js';

function createWorker(year, session) {
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
        'child_process': u('./child_process.js'),
        'crypto': u('./crypto.js'),
        'vm': u('./vm.js'),
      },
      scopes: {},
    },
  });
  worker.onmessage = e => {
    if (e.data.type === 'log') {
      console.log(e.data.log);
    } else if (e.data.type === 'ready') {
      worker.postMessage({ type: 'solveAll', year, session });
    }
  };
  worker.onerror = e => {
    if (e.message.includes('https://crbug.com/680046')) {
      solveAll(year, session);
    }
  };
  window.SolverWorker = worker;
}

export function run(year) {
  const session = document.getElementById('session').value;
  document.getElementById('session').value = '';
  createWorker(year, session);
  return false;
}

console.log = (...args) => {
  const str = args.map(x => `${x}`).join(' ') + '\n';
  document.getElementById('output').innerText += str;
};
