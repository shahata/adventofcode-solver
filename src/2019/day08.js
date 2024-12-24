import { ocr } from "../utils/ocr.js";

export function part1(input, wide = 25, tall = 6) {
  let bits = input.split("");
  let layers = [];
  bits.forEach((bit, index) => {
    let layer = Math.floor(index / (wide * tall));
    layers[layer] = (layers[layer] || []).concat(bit);
  });
  let counts = layers.map(x => ({
    zeros: x.filter(bit => bit === "0").length,
    result:
      x.filter(bit => bit === "1").length * x.filter(bit => bit === "2").length,
  }));
  return counts.sort((a, b) => a.zeros - b.zeros).shift().result;
}

export function part2(input, wide = 25, tall = 6) {
  let bits = input.split("");
  let layers = [];
  bits.forEach((bit, index) => {
    let layer = Math.floor(index / (wide * tall));
    layers[layer] = (layers[layer] || []).concat(bit);
  });
  let result = new Array(wide * tall).fill("2");
  layers.forEach(layer => {
    layer.forEach((bit, index) => {
      result[index] = result[index] === "2" ? bit : result[index];
    });
  });
  let rows = [];
  result.forEach((bit, index) => {
    let row = Math.floor(index / wide);
    rows[row] = (rows[row] || "") + bit;
  });
  return ocr(
    rows.map(row => `${row.replace(/0/g, ".").replace(/1/g, "#")}`).join("\n"),
  );
}
