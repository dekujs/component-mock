# component-mock

> A wrapper for deku components to facilitate easier unit-testing.

## Usage

```js
var Mock = require('component-mock');

var Component = {
  defaultProps: {
    name: 'a'
  },
  render: function ({ props }) {
    return <div>{props.name}</div>;
  }
}

var mock = Mock(Component);

var node = mock.render();
assert.isNode(node, 'div');
assert.hasChildren(node, [ 'a' ]);

var node = mock.render({ props: { name: 'b' } });
assert.isNode(node, 'div');
assert.hasChildren(node, [ 'b' ]);
```

## Mock(Component)

Returns a wrapper object for the `Component`. The goal is that there will be
many methods that reflect various lifecycle events for the deku component.
Currently, we only deal with `render`, but others will be added over time as
we develop good testing strategies.

## mock.render(component)

Calls `Component.render()`. The render function will have all the parameters
it would normally expect generated automatically. (eg: `props`,
`props.children` and `state`)

This also uses `Component.defaultProps` and `Component.initialState()` to ensure
the `component` object is generated accurately.

The `setState` function that is passed is simply a no-op, it won't trigger any
other changes. (as it shouldn't, since this is designed for unit-testing)
