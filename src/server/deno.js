/* global Deno */
import worker from "./worker.js";

Deno.serve(worker.fetch);
