
var assert = require('assert');
var util = require('./util');

module.exports = function (Component) {
  assert(Component, 'expected a component');

  if (typeof Component === 'function') {
    Component = { render: Component };
  }

  return { render: render };

  // TODO: how to test other lifecycle methods?

  function render(overrides) {
    return Component.render(util.normalize(Component, overrides), util.noop);
  }
};
