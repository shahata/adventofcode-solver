/* global process */
'use strict';
let input = '';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function () {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    input += chunk;
  }
});

process.stdin.on('end', function () {
  let code = input.split('\n');
  while (code.shift().indexOf('export') === -1) {}
  while (code.pop().indexOf('return') === -1) {}
  console.log(code.length + 1);
});
