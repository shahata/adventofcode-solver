/* global importScripts, self */
import { solveAll } from './solver.js';

importScripts(
  'https://unpkg.com/js-combinatorics@0.5.4/combinatorics.js',
  'https://unpkg.com/node-forge@0.9.1/dist/forge.min.js',
);
self.onmessage = async e => {
  await solveAll(e.data.year, e.data.session);
  self.postMessage({ type: 'done' });
};
console.log = (...args) => {
  const str = args.map(x => `${x}`).join(' ');
  self.postMessage({ type: 'log', log: str });
};
self.postMessage({ type: 'ready' });
