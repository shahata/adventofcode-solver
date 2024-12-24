import md5 from "../utils/md5.js";

export function day(input) {
  let hash,
    count = 0;
  let password1 = "";
  let password2 = [];
  let index = -1;
  while (count < 8) {
    do {
      index++;
      hash = md5(input + index);
    } while (!hash.startsWith("00000"));

    let i = +hash[5];
    password1 += hash[5];
    if (i >= 0 && i <= 7 && !password2[i]) {
      password2[i] = hash[6];
      count++;
    }
  }

  return {
    part1: password1.slice(0, 8),
    part2: password2.join(""),
  };
}
