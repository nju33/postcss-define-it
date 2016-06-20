const fs = require('fs');
const postcss = require('postcss');
const CSON = require('cson');
const defineIt = require('../..');

const css = fs.readFileSync('./sample.css', 'utf8');
const vars = CSON.load('./vars.cson');

postcss([defineIt(vars)])
  .process(css)
  .then(result => console.log(result.css));
