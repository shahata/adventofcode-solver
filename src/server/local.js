/* global Deno */
import worker from "./worker.js";
import { serveDir } from "jsr:@std/http/file-server";

const options = {
  onListen: () => console.log("Listening on https://localhost"),
  cert: await Deno.readTextFile("./static/http-cert.pem"),
  key: await Deno.readTextFile("./static/http-key.pem"),
  port: 443,
};

Deno.serve(options, async function (req) {
  const response = await worker.fetch(req);
  return response.status === 404 ? serveDir(req) : response;
});
