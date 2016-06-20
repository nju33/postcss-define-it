const fs = require('fs');
const postcss = require('postcss');
const css = fs.readFileSync('./sample.css', 'utf8');
const defineIt = require('../..');
const vars = require('./vars');

var output = postcss()
  .use(defineIt(vars))
  .process(css)
  .css;

console.log(output);
