const fs = require('fs');
const postcss = require('postcss');
const YAML = require('yamljs');
const css = fs.readFileSync('./sample.css', 'utf8');
const objectVars = require('../..');
const vars = YAML.load('./vars.yml');

var output = postcss()
  .use(objectVars(vars))
  .process(css)
  .css;

console.log(output);
