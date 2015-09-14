
var extend = require('extend');

exports.normalize = function (Component, component) {
  if (!component) component = {};

  // props
  var props = extend(true, {}, Component.defaultProps, component.props);

  // state
  var initialState = Component.initialState || exports.noop;
  var state = extend(true, {}, initialState(props), component.state);

  // children
  if (!props.children) props.children = [];
  if (!Array.isArray(props.children)) props.children = [ props.children ];

  // component
  return {
    props: props,
    state: state
  };
};

exports.noop = function () {};
