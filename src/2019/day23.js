import { execute } from "./day09.js";

function run(input, network, id) {
  let next = { id: "x", x: "y", y: "id" };
  let outputState = "id";
  let inputState = "id";
  let sendId;

  function read() {
    let packet = network[id].packets.shift();
    if (packet) {
      inputState = next[packet.type];
      return packet.value;
    } else {
      network[id].idle++;
      return -1;
    }
  }

  function write(x) {
    network[id].idle = 0;
    if (outputState === "id") {
      sendId = x;
      network[sendId] = network[sendId] || { packets: [] };
    } else {
      network[sendId].packets.push({ type: outputState, value: x });
    }
    outputState = next[outputState];
  }

  let user = { input: read, output: write, base: 0 };
  let ops = input.split(",").map(Number);
  let ip = 0;
  return () => {
    do {
      ip = execute(ops, ip, user);
    } while (outputState !== "id" || inputState === "y");
  };
}

function init(input) {
  let network = new Array(50).fill().map((x, i) => {
    return { packets: [{ type: "id", value: i }], idle: 0, cpu: undefined };
  });
  network.forEach((x, i) => (x.cpu = run(input, network, i)));
  return network;
}

export function part1(input) {
  let network = init(input);
  while (!network[255]) {
    for (let i = 0; i < 50; i++) {
      network[i].cpu();
    }
  }
  return network[255].packets.pop().value;
}

export function part2(input) {
  let prev1, prev2;
  let network = init(input);
  while (prev2 === undefined || prev1 !== prev2) {
    for (let i = 0; i < 50; i++) {
      network[i].cpu();
    }
    if (network[255] && network.every((x, i) => i === 255 || x.idle > 100)) {
      let retransmit = network[255].packets.slice(-2);
      network[0].packets.push(...retransmit);
      network[0].idle = 0;
      network.splice(255, 1);
      prev2 = prev1;
      prev1 = retransmit[1].value;
    }
  }
  return prev2;
}
