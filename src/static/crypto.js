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

// const crypto = {
//   createHash: () => {
//     let value;
//     return {
//       update: x => (value = x),
//       digest: () =>
//         Module.ccall(
//           'getMD5', // c function name
//           'string', // return type
//           ['string'], // params type
//           [value], // params
//         ),
//     };
//   },
// };

export default crypto;
