import { createHash } from "node:crypto";

export default function md5(str) {
  let hash = createHash("md5");
  hash.update(str);
  return hash.digest("hex");
}
