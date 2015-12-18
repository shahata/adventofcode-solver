'use strict';

export function day7(input) {
  /* jslint bitwise: true */
  let ops = {
    'AND': (p1, p2) => p1 & p2,
    'OR': (p1, p2) => p1 | p2,
    'NOT': (p1, p2) => ~p2,
    'LSHIFT': (p1, p2) => p1 << p2,
    'RSHIFT': (p1, p2) => p1 >> p2,
    'undefined': p1 => p1
  };

  function getter(id) {
    return id && id.match(/[a-z]+/) ? circuit => circuit[id]() : () => id;
  }

  function makeCircuit(input) {
    return input.map(x => x.match(/^(?:(\w+) )?(?:(AND|OR|NOT|LSHIFT|RSHIFT) (\w+) )?-> (\w+)$/))
                .map(x => ({op: ops[x[2] + ''], p1: getter(x[1]), p2: getter(x[3]), result: x[4]}))
                .reduce((circuit, gate) => {
                  circuit[gate.result] = () => {
                    let memo = gate.op(gate.p1(circuit), gate.p2(circuit));
                    circuit[gate.result] = () => memo;
                    return memo;
                  };
                  return circuit;
                }, {});
  }

  let part1 = makeCircuit(input.split('\n')).a();
  let part2 = makeCircuit(input.split('\n').concat(`${part1} -> b`)).a();
  return [part1, part2];
}
