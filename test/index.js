
var assert = require('assert');
var mock = require('..');
var util = require('../lib/util');

describe('mock', function () {
  it('should be a function', function () {
    assert.strictEqual(typeof mock, 'function');
  });

  it('should return an object', function () {
    assert.strictEqual(typeof mock({}), 'object');
  });

  describe('.render(component)', function () {
    it('should be passed a normalized component and noop setState', function () {
      var Component = {
        render: function (component, setState) {
          assert.deepEqual(component, util.normalize(Component));
          assert.strictEqual(setState, util.noop);
        }
      };

      mock(Component).render();
    });

    it('should return whatever the render method returns', function () {
      var ret = {};

      var Component = {
        render: function (component, setState) {
          return ret;
        }
      };

      assert.strictEqual(mock(Component).render(), ret);
    });

    it('should normalize arguments into a component object', function () {
      var overrides = {
        props: {
          a: 1,
          children: [
            'Hello World'
          ]
        },
        state: {
          b: 2
        }
      };

      var Component = {
        render: function (component) {
          assert.deepEqual(component, util.normalize(Component, overrides));
        }
      };

      mock(Component).render(overrides);
    });

    it('should normalize a function into a component w/ only a render fn', function () {
      var ret = {};

      function Component() {
        return ret;
      }

      assert.strictEqual(mock(Component).render(), ret);
    });
  });
});
