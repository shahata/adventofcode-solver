/* global forge */
import "node-forge";

export function createHash() {
  let hash = forge.md5.create();
  return {
    update: x => hash.update(x),
    digest: () => hash.digest().toHex(),
  };
}
