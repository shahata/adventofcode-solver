function parse({ score, level, removed, mode }, next) {
  if (mode === "read") {
    switch (next) {
      case "{":
        return { level: level + 1, score: score + level + 1, removed, mode };
      case "}":
        return { level: level - 1, score, removed, mode };
      case "<":
        return { level, score, removed, mode: "garbage" };
      case "!":
        return { level, score, removed, mode: "ignore-read" };
      default:
        return { level, score, removed, mode };
    }
  } else if (mode === "garbage") {
    switch (next) {
      case ">":
        return { level, score, removed, mode: "read" };
      case "!":
        return { level, score, removed, mode: "ignore-garbage" };
      default:
        return { level, score, removed: removed + 1, mode };
    }
  } else {
    return { level, score, removed, mode: mode.replace("ignore-", "") };
  }
}

function process(input) {
  return input
    .split("")
    .reduce(parse, { score: 0, level: 0, removed: 0, mode: "read" });
}

export function part1(input) {
  return process(input).score;
}

export function part2(input) {
  return process(input).removed;
}
