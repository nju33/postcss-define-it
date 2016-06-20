import fs from 'fs';
import test from 'ava';
import postcss from 'postcss';
import defineIt from '..';
import vars from '../examples/js-object/vars';

const css = fs.readFileSync('../examples/js-object/sample.css', 'utf-8');
const expect = fs.readFileSync('./expect.css', 'utf-8');

function process() {
  return new Promise(resolve => {
    postcss([defineIt(vars)])
      .process(css)
      .then(result => resolve(result.css));
  });
}

test('defineIt', async t => {
  t.is(await process(), expect);
});
