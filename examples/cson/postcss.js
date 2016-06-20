const fs = require('fs');
const postcss = require('postcss');
const CSON = require('cson');
const css = fs.readFileSync('./sample.css', 'utf8');
const defineIt = require('../..');
const vars = CSON.load('./vars.cson');

console.log(vars);

var output = postcss()
  .use(defineIt(vars))
  .process(css)
  .css;

console.log(output);
