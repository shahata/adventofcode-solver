/* global forge */
export function createHash() {
  const hash = forge.md.md5.create();
  return {
    update: x => hash.update(x),
    digest: () => hash.digest().toHex(),
  };
}
