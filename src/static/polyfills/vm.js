export function runInThisContext(...args) {
  return eval.apply(this, args);
}
