# PostCSS Define It

[![Build Status](https://travis-ci.org/totora0155/postcss-define-it.svg?branch=master)](https://travis-ci.org/totora0155/postcss-define-it)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

PostCSS plugin that to define and be able to use

---

## Prepare

Defined like

```js
'use strict';
module.exports = {
  fontSize: '1em',
  background: '#fff',

  top: '1em',
  right: '2em',
  bottom: '3em',
  left: '4em',

  color: {
    base: '#f8f8f8',
    sub: '#cb4042',
    main: '#34bebc'
  },

  pathto: '/path/to',

  char: '\\2713',

  widths: [
    '415px',
    '768px'
  ]
};

```

Write css

```css
@charset "utf-8";

.test {
  background-color: $background;
  font-size: $fontSize;
  font-size: \$fontSize;

  margin: $top $right $bottom $left;

  color: $color.main;
  border-left: 1px solid $color.sub;

  background-image: url($pathto/img.png);
}

.test:before {
  content: "$char : ";
}

@media screen and (min-width: $widths[0]) {}
@media screen and (min-width: $widths[1]) {}
@media screen and (min-width: $widths[2]) {}

```

## Transform

```js
const fs = require('fs');

const postcss = require('postcss');
const defineIt = require('../..');
const vars = require('./vars');

const css = fs.readFileSync('./sample.css', 'utf8');

postcss([defineIt(vars)])
  .process(css)
  .then(result => console.log(result.css));

```

## Output

```css
@charset "utf-8";

.test {
  background-color: #fff;
  font-size: 1em;
  font-size: $fontSize;

  margin: 1em 2em 3em 4em;

  color: #34bebc;
  border-left: 1px solid #cb4042;

  background-image: url(/path/to/img.png);
}

.test:before {
  content: "\2713 : ";
}

@media screen and (min-width: 415px) {}
@media screen and (min-width: 768px) {}
@media screen and (min-width: $widths[2]) {}
```
