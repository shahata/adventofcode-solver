import { imports, aocSolverServer } from "./urls.js";

class WorkerShim {
  constructor(url, options) {
    let blob = URL.createObjectURL(
      new Blob(
        [
          `self.window = self;`, // hack so that node-forge & es-module-shims will work in the worker
          `importScripts('${imports["es-module-shims"]}');`,
          `importShim.addImportMap(${JSON.stringify(options.importMap)});`,
          `self['workerShimUrl'] = '${url}';`,
          `importShim('${url}');`,
        ],
        { type: "application/javascript" },
      ),
    );
    return new Worker(blob, Object.assign({}, options, { type: undefined }));
  }
}

let solverWorker;

function runWorker(session, year, day = 1) {
  return new Promise(resolve => {
    if (solverWorker) {
      solverWorker.terminate();
    }
    if (day === 1) {
      document.getElementById("output").innerHTML = "";
    }
    document.getElementById("skip").onsubmit = () =>
      runWorker(session, year, day + 1) && false;
    document.getElementById("loader").style.display = "block";

    let u = s => new URL(s, location.toString());
    let worker = /** @type {Worker} */ (
      new WorkerShim(u("../utils/worker.js"), {
        type: "module",
        importMap: {
          imports: {
            ...imports,
            "node:crypto": u("../utils/crypto-polyfill.js"),
          },
        },
      })
    );
    worker.onmessage = e => {
      if (e.data.type === "log") {
        console.log(e.data.log);
      } else if (e.data.type === "day") {
        day = e.data.day;
      } else if (e.data.type === "ready") {
        worker.postMessage({ type: "solveAll", session, year, day });
      } else if (e.data.type === "done") {
        document.getElementById("loader").style.display = "none";
        resolve();
      }
    };
    solverWorker = worker;
  });
}

function cleanResult(str, year) {
  if (str.includes("Congratulations!")) {
    str = str.match(/<main>([^]*)<\/main>/)[1].trim();
    str = str.replace(/<article>[^]*<\/article>/, "");
    return `<a href="https://adventofcode.com/${year}">[Go Check on Your Calendar]</a> ${str}`;
  } else if (str.includes("too recently")) {
    return '<input type="submit" value="[Retry (Throttled)]">';
  } else {
    return str;
  }
}

async function submitAnswer(e) {
  let form = e.target;
  let session = form.querySelector("#session").value;
  let year = form.querySelector("#year").value;
  let day = form.querySelector("#day").value;
  let level = form.querySelector("#level").value;
  let answer = form.querySelector("#answer").value;
  let url = `${aocSolverServer}/answer/${year}/${day}?session=${session}`;
  let result = await fetch(url, {
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `level=${level}&answer=${encodeURIComponent(answer)}`,
    method: "POST",
  });
  form.removeChild(e.submitter);
  form.innerHTML += cleanResult(await result.text(), year);
  if (level === "1" && form.innerHTML.includes("That's the right answer!")) {
    document
      .querySelectorAll(`input#day[value="${day}"] ~ input[type="submit"]`)
      .forEach(x => x.removeAttribute("disabled"));
  }
}

export async function run(year) {
  /** @type {HTMLInputElement} */
  let sessionElement = document.querySelector("#session");
  let session = sessionElement.value;
  sessionElement.value = "";
  sessionElement.blur();
  await runWorker(session, year);
}

console.log = (...args) => {
  let str = args.map(x => `${x}`).join(" ");
  let element = document.createElement("span");
  element.innerHTML = str;
  let children = new Array(...element.children);
  if (children.length > 0) {
    for (let x of children) {
      document.getElementById("output").appendChild(x);
    }
  } else {
    document.getElementById("output").appendChild(element);
    document.getElementById("output").appendChild(document.createElement("br"));
  }
  document
    .querySelectorAll("#submitter")
    .forEach(
      (/** @type {HTMLFormElement} */ form) =>
        (form.onsubmit = e => submitAnswer(e) && false),
    );
};
