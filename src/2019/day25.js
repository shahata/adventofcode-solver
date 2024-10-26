import { execute } from "./day09.js";
import { powerSet } from "combinatorial-generators";

export function part1(input) {
  let mode, doors, items, name, combinations, exit, result;
  const map = {};
  let output = [];
  let commands = [];
  let allItems = [];

  function pushCommand(cmd) {
    commands = commands.concat(`${cmd}\n`.split("").map(x => x.charCodeAt(0)));
  }

  function initCombinations(items) {
    return [...powerSet(items)].slice(1);
  }

  function readyForChecks(map, name) {
    return (
      name === "== Security Checkpoint ==" &&
      Object.values(map).every(x => x.doors.length === x.walked.size)
    );
  }

  function nextCommand() {
    if (items.length) {
      const x = items.shift();
      pushCommand(`take ${x}`);
      allItems.push(x);
    } else if (readyForChecks(map, name)) {
      combinations = combinations || initCombinations(allItems);
      const next = combinations[0];
      if (next.length === allItems.length) {
        combinations.shift();
        pushCommand(exit);
      } else {
        const remove = allItems.find(x => !next.includes(x));
        pushCommand(`drop ${remove}`);
        allItems = allItems.filter(x => x !== remove);
      }
    } else {
      let direction = doors[Math.floor(Math.random() * doors.length)];
      if (map[name].doors.length > map[name].walked.size) {
        const options = map[name].doors.filter(x => !map[name].walked.has(x));
        direction = options[Math.floor(Math.random() * options.length)];
        map[name].walked.add(direction);
      }
      pushCommand(direction);
    }
  }

  function parse(line) {
    if (line[0] !== "-") {
      mode = "";
    }
    if (line[0] === "=") {
      name = line;
      doors = [];
      items = [];
    }
    if (mode === "doors") {
      const opposite = {
        north: "south",
        south: "north",
        west: "east",
        east: "west",
      };
      if (name === "== Pressure-Sensitive Floor ==") {
        exit = opposite[line.replace("- ", "")];
      }
      doors.push(line.replace("- ", ""));
    }
    if (mode === "items") {
      const blacklist = [
        "escape pod",
        "infinite loop",
        "molten lava",
        "giant electromagnet",
        "photons",
      ];
      if (!blacklist.includes(line.replace("- ", ""))) {
        items.push(line.replace("- ", ""));
      }
    }
    if (line === "Doors here lead:") {
      mode = "doors";
    }
    if (line === "Items here:") {
      mode = "items";
    }
    if (line.match(/You should be able to get in by typing (\d+)/)) {
      [, result] = line.match(/You should be able to get in by typing (\d+)/);
    }
    if (line === "Command?") {
      map[name] = map[name] || { doors, walked: new Set() };
      nextCommand();
    }
  }

  function write(x) {
    if (x === 10) {
      parse(output.map(x => String.fromCharCode(x)).join(""));
      output = [];
    } else {
      output.push(x);
    }
  }

  const user = { input: () => commands.shift(), output: write, base: 0 };
  const ops = input.split(",").map(Number);
  let ip = 0;
  while (!result) {
    ip = execute(ops, ip, user);
  }
  return result;
}

export function part2() {
  return undefined;
}
