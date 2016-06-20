'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('postcss-object-vars', function () {
  let vars = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  const _process = process.bind(null, vars);
  return (css, result) => {
    css.replaceValues(/.+/, { fast: '$' }, _process);
    css.walkAtRules(_process);
  };
});


function process(vars, target) {
  const isAt = () => {
    return target.constructor.name === 'AtRule';
  };
  const re = /\$[^\s)/]+/g;
  let _target = null;
  if (isAt()) {
    _target = target.params;
  }
  let result = _target || target;
  let matches = null;

  while ((matches = re.exec(target)) !== null) {
    const key = matches[0].substr(1);
    const escaper = target[matches.index - 1];
    if (escaper === '\\') {
      return `$${ key }`;
    }

    if (_lodash2.default.has(vars, key)) {
      const value = _lodash2.default.get(vars, key);
      const re = new RegExp(_lodash2.default.escapeRegExp(`$${ key }`));
      result = result.replace(re, value);
    }
  }

  if (isAt()) {
    target.params = result;
    return target;
  } else {
    return result;
  }
};