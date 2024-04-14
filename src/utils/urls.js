import pkg from '../../static/package-lock.js';

const v = p => pkg.packages[`node_modules/${p}`].version;
const skypack = (name, suffix = '') => ({
  [name]: `https://cdn.skypack.dev/${name}@${v(name)}${suffix}?min`,
});
const unpkg = (name, suffix = '') => ({
  [name]: `https://unpkg.com/${name}@${v(name)}${suffix}`,
});

export const imports = {
  ...skypack('regenerator-runtime'),
  ...skypack('@datastructures-js/priority-queue'),
  ...skypack('combinatorial-generators'),
  ...skypack('chart.js'),
  ...skypack('@graph-algorithm/minimum-cut'),
  ...unpkg('node-forge', '/dist/forge.min.js'),
  ...unpkg('es-module-shims'),
};
