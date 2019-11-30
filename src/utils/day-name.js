const dayName = num => `day${num.padStart(2, '0')}`;
const isDayName = name => !!name.match(/^day\d\d$/);

module.exports = { dayName, isDayName };
