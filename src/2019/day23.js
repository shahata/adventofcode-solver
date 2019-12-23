import { execute } from './day09.js';

function run(input, network, id) {
  let outputState = 'id';
  let inputState = 'id';
  let sendId;
  const next = {
    id: 'x',
    x: 'y',
    y: 'id',
  };
  const user = {
    input: () => {
      const packet = network.packets[id].shift();
      if (packet) {
        inputState = next[packet.type];
        return packet.value;
      } else {
        network.idle[id]++;
        return -1;
      }
    },
    output: x => {
      network.idle[id] = 0;
      if (outputState === 'id') {
        sendId = x;
        network.packets[sendId] = network.packets[sendId] || [];
      } else {
        network.packets[sendId].push({ type: outputState, value: x });
      }
      outputState = next[outputState];
    },
    base: 0,
  };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;
  return () => {
    do {
      ip = execute(ops, ip, user);
    } while (outputState !== 'id' || inputState === 'y');
  };
}

function init(input) {
  const network = {
    computers: [],
    packets: [],
    idle: [],
  };

  for (let i = 0; i < 50; i++) {
    network.packets[i] = [{ type: 'id', value: i }];
    network.idle[i] = 0;
    network.computers[i] = run(input, network, i);
  }
  return network;
}

export function part1(input) {
  const network = init(input);
  while (!network.packets[255]) {
    for (let i = 0; i < 50; i++) {
      network.computers[i]();
    }
  }
  return network.packets[255][1].value;
}

export function part2(input) {
  let prev1, prev2;
  const network = init(input);
  while (prev2 === undefined || prev1 !== prev2) {
    for (let i = 0; i < 50; i++) {
      network.computers[i]();
    }
    if (network.idle.every(x => x > 100) && network.packets[255]) {
      const retransmit = network.packets[255].slice(-2);
      network.packets[0].push(...retransmit);
      network.idle[0] = false;
      delete network.packets[255];
      prev2 = prev1;
      prev1 = retransmit[1].value;
    }
  }
  return prev2;
}
