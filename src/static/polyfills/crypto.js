/* global forge */
import 'https://unpkg.com/node-forge@1.3.1/dist/forge.min.js';

export function createHash() {
  const hash = forge.md5.create();
  return {
    update: x => hash.update(x),
    digest: () => hash.digest().toHex(),
  };
}
