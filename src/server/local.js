/* global Deno */
import worker from "./worker.js";
import { serveDir } from "jsr:@std/http/file-server";

let options = {
  onListen: () => console.log("Listening on https://localhost"),
  cert: await Deno.readTextFile("./static/http-cert.pem"),
  key: await Deno.readTextFile("./static/http-key.pem"),
  port: 443,
};

Deno.serve(options, async function (req) {
  let response = await worker.fetch(req);
  return response.status === 404 ? serveDir(req) : response;
});
