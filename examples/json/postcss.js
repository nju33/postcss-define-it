const fs = require('fs');

const postcss = require('postcss');
const defineIt = require('../..');
const vars = require('./vars');

const css = fs.readFileSync('./sample.css', 'utf8');

const output = postcss()
  .use(defineIt(vars))
  .process(css)
  .css;

console.log(output);
