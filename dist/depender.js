'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Depender = (function () {
  function Depender() {
    _classCallCheck(this, Depender);

    this.deps = {};
  }

  _createClass(Depender, [{
    key: 'define',
    value: function define(name, fn) {
      this.deps[name] = fn;
      return this;
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.deps[name];
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      var exist = this.get(name);

      if (!exist) return;

      delete this.deps[name];
      return this;
    }
  }, {
    key: 'use',
    value: function use(fn) {
      var _this = this;

      if (typeof fn !== 'function') return;

      fn.apply(fn, splitArguments(fn).map(function (item) {
        return _this.get(trim(item));
      }));

      return this;
    }
  }]);

  return Depender;
})();

exports['default'] = Depender;

function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, '');
}

function splitArguments(fn) {
  var left = fn.toString().split(')')[0];

  return left.substr(left.indexOf('(') + 1).split(',');
}
module.exports = exports['default'];
//# sourceMappingURL=depender.js.map