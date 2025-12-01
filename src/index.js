import { solveDay, solveAllDays, solveAllYears } from "./utils/solver.js";
import * as process from "node:process";

if (process.env.ADVENT_SESSION) {
  let year = process.argv[2];
  let day = process.argv[3];
  if (process.argv[2] && process.argv[2].includes("/")) {
    let clean = process.argv[2].split("/").slice(-2);
    let yearNum = parseInt(clean[0].match(/\d+/).pop());
    let dayNum = parseInt(clean[1].match(/\d+/).pop());
    if (Number.isNaN(yearNum) || Number.isNaN(dayNum)) {
      console.error("Invalid arguments");
      process.exit(0);
    }
    year = `${yearNum}`;
    day = `${dayNum}`;
  }
  if (day) await solveDay(year, day);
  else if (year) await solveAllDays(year);
  else await solveAllYears();
} else {
  console.error("************************************************************");
  console.error("************************************************************");
  console.error("**                                                        **");
  console.error("** You must set environment variable named ADVENT_SESSION **");
  console.error("** with the session cookie value from adventofcode.com    **");
  console.error("**                                                        **");
  console.error("************************************************************");
  console.error("************************************************************");
  console.error("");
}
process.exit(0);
