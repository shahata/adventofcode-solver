/* global forge */
const crypto = {
  createHash: () => {
    const hash = forge.md.md5.create();
    return {
      update: x => hash.update(x),
      digest: () => hash.digest().toHex(),
    };
  },
};

export default crypto;
