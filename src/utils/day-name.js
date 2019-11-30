export const dayName = num => `day${num.padStart(2, '0')}`;
export const isDayName = name => !!name.match(/^day\d\d$/);
