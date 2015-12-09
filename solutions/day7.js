/* global console */
'use strict';

export function day7(input) {
  let operations = {
    'AND': (p1, p2) => p1 & p2,
    'OR': (p1, p2) => p1 | p2,
    'NOT': (p1, p2) => ~ p2,
    'LSHIFT': (p1, p2) => p1 << p2,
    'RSHIFT': (p1, p2) => p1 >> p2,
    'undefined': p1 => p1
  };

  function getter(identifier) {
    return identifier && identifier.match(/[a-z]+/) ? circuit => circuit[identifier]() : () => identifier;
  }

  let part1 = input.split('\n')
                   .map(x => x.match(/^(?:(\w+) )?(?:(AND|OR|NOT|LSHIFT|RSHIFT) (\w+) )?-> (\w+)$/).slice(1))
                   .map(x => ({op: operations[x[1] + ''], p1: getter(x[0]), p2: getter(x[2]), result: x[3]}))
                   .reduce((circuit, gate) => {
                     circuit[gate.result] = () => {
                       let memo = gate.op(gate.p1(circuit), gate.p2(circuit));
                       circuit[gate.result] = () => memo;
                       return memo;
                     };
                     return circuit;
                   }, {}).a();
  console.log(`Part1: ${part1}`);

  let part2 = input.split('\n')
                   .concat(`${part1} -> b`)
                   .map(x => x.match(/^(?:(\w+) )?(?:(AND|OR|NOT|LSHIFT|RSHIFT) (\w+) )?-> (\w+)$/).slice(1))
                   .map(x => ({op: operations[x[1] + ''], p1: getter(x[0]), p2: getter(x[2]), result: x[3]}))
                   .reduce((circuit, gate) => {
                     circuit[gate.result] = () => {
                       let memo = gate.op(gate.p1(circuit), gate.p2(circuit));
                       circuit[gate.result] = () => memo;
                       return memo;
                     };
                     return circuit;
                   }, {}).a();
  console.log(`Part2: ${part2}`);
}
