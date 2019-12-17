export function execSync(cmd) {
  throw `Cannot execute "${cmd.split(' ').shift()}" in the browser`;
}
