const color = require('color');

const colors = {
  black: '#000000',
  grey: color('#7c7c7c').lighten(0.5).hexString(),
  darkGrey: color('#7c7c7c').lighten(0.1).hexString(),
  xDarkGrey: '#7c7c7c',
  mediumGrey: '#ececec',
  lightGrey: '#f9f9f9',
  white: '#fff',
  chalk: '#89877b',
  darkChalk: '#7f7d71',
  red: '#d9534f'
};

export default colors;
