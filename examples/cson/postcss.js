const fs = require('fs');
const postcss = require('postcss');
const CSON = require('cson');
const defineIt = require('../..');

const css = fs.readFileSync('./sample.css', 'utf8');
const vars = CSON.load('./vars.cson');

const output = postcss()
  .use(defineIt(vars))
  .process(css)
  .css;

console.log(output);
