export function memoize(fn) {
  let memo = {};
  return (...x) => {
    let s = JSON.stringify(x);
    return (memo[s] = memo[s] ?? fn(...x));
  };
}
