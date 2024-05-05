export function dayName(num) {
  return `day${num.padStart(2, '0')}`;
}

export function isDayName(name) {
  return !!name.match(/^day\d\d$/);
}
