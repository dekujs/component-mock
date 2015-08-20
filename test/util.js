
var assert = require('assert');
var util = require('../lib/util');

describe('util', function () {
  describe('.normalize(Component, [component])', function () {
    it('should not require any arguments', function () {
      assert.deepEqual(util.normalize({}), {
        props: {
          children: []
        },
        state: {}
      });
    });

    it('should allow setting custom props', function () {
      var props = { a: true, b: null };
      assert.deepEqual(util.normalize({}, { props: props }), {
        props: {
          a: true,
          b: null,
          children: []
        },
        state: {}
      });
    });

    it('should allow setting custom state', function () {
      var state = { a: true, b: null };
      assert.deepEqual(util.normalize({}, { state: state }), {
        props: {
          children: []
        },
        state: {
          a: true,
          b: null
        }
      });
    });

    it('should allow setting custom children', function () {
      var props = { children: [ 'Hello World' ] };
      assert.deepEqual(util.normalize({}, { props: props }), {
        props: {
          children: [
            'Hello World'
          ]
        },
        state: {}
      });
    });

    it('should account for defaultProps', function () {
      var Component = {
        defaultProps: {
          a: true
        }
      };
      assert.deepEqual(util.normalize(Component), {
        props: {
          a: true,
          children: []
        },
        state: {}
      });
    });

    it('should merge default props with custom props', function () {
      var Component = {
        defaultProps: {
          a: true
        }
      };
      var props = { a: false, b: null };
      assert.deepEqual(util.normalize(Component, { props: props }), {
        props: {
          a: false,
          b: null,
          children: []
        },
        state: {}
      });
    });

    it('should account for initialState(props)', function () {
      var Component = {
        initialState: function (props) {
          return {
            a: 1
          };
        }
      };
      assert.deepEqual(util.normalize(Component), {
        props: {
          children: []
        },
        state: {
          a: 1
        }
      });
    });

    it('should pass generated props to initialState(props)', function () {
      var Component = {
        initialState: function (props) {
          assert.deepEqual(props, {
            a: 1
          });
        }
      };
      var props = { a: 1 };
      assert.deepEqual(util.normalize(Component, { props: props }), {
        props: {
          a: 1,
          children: []
        },
        state: {}
      });
    });

    it('should merge initial state with custom state', function () {
      var Component = {
        initialState: function (props) {
          return {
            a: props.a,
            b: 2
          }
        }
      };
      var state = { a: 1 };
      assert.deepEqual(util.normalize(Component, { state: state }), {
        props: {
          children: []
        },
        state: {
          a: 1,
          b: 2
        }
      });
    });
  });

  describe('.noop', function () {
    it('should be a function', function () {
      assert.strictEqual(typeof util.noop, 'function');
    });

    it('should not have any body', function () {
      assert.strictEqual(util.noop.toString(), 'function () {}');
    });
  });
});
