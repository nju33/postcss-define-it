const fs = require('fs');

const postcss = require('postcss');
const YAML = require('yamljs');
const defineIt = require('../..');

const css = fs.readFileSync('./sample.css', 'utf8');
const vars = YAML.load('./vars.yml');

const output = postcss()
  .use(defineIt(vars))
  .process(css)
  .css;

console.log(output);
