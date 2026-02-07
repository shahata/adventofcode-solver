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
  if (response.status === 404) response = await serveDir(req);
  let session = Deno.env.get("ADVENT_SESSION");
  if (
    session &&
    response.status === 200 &&
    new URL(req.url).pathname.endsWith("/solver.html")
  ) {
    let html = await response.text();
    html = html.replace('id="session"', `id="session" value="${session}"`);
    response = new Response(html, response);
  }
  return response;
});
