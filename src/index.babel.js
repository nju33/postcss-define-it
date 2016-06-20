import postcss from 'postcss';
import _ from 'lodash';

export default postcss.plugin('postcss-object-vars', (vars = {}) => {
  const _process = process.bind(null, vars);
  return css => {
    css.replaceValues(/.+/, {fast: '$'}, _process);
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
      return `$${key}`;
    }

    if (_.has(vars, key)) {
      const value = _.get(vars, key);
      const re = new RegExp(_.escapeRegExp(`$${key}`));
      result = result.replace(re, value);
    }
  }

  if (isAt()) {
    target.params = result;
    return target;
  }
  return result;
}
