import pkg from "../../static/package-lock.js";

function v(p) {
  return pkg.packages[`node_modules/${p}`].version;
}

function skypack(name, suffix = "") {
  return { [name]: `https://cdn.skypack.dev/${name}@${v(name)}${suffix}?min` };
}

function unpkg(name, suffix = "") {
  return { [name]: `https://unpkg.com/${name}@${v(name)}${suffix}` };
}

export const imports = {
  ...skypack("regenerator-runtime"),
  ...skypack("@datastructures-js/priority-queue"),
  ...skypack("combinatorial-generators"),
  ...skypack("chart.js"),
  ...skypack("@graph-algorithm/minimum-cut"),
  ...unpkg("node-forge", "/dist/forge.min.js"),
  ...unpkg("es-module-shims"),
};

function server() {
  if (
    typeof location !== "undefined" &&
    location.origin === "https://localhost"
  ) {
    return "https://localhost";
  } else {
    return "https://aoc.deno.dev";
  }
}

export const aocSolverServer = server();
