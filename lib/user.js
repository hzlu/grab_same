'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backupMedia = require('./backupMedia');

var _backupMedia2 = _interopRequireDefault(_backupMedia);

var _fetchSame = require('./fetchSame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(userId) {
    _classCallCheck(this, User);

    this.userId = userId;
    this.profileUrl = '/user/' + userId + '/profile';
    this.sensesUrl = '/user/' + userId + '/senses';
    this.nextSenses = '';
  }

  _createClass(User, [{
    key: 'setNext',
    value: function setNext(next) {
      this.nextSenses = next;
    }
  }, {
    key: 'detail',
    value: function detail() {
      return (0, _fetchSame.printUserProfile)(this.profileUrl);
    }
  }, {
    key: 'senses',
    value: function senses() {
      return (0, _fetchSame.printSenses)(this.nextSenses || this.sensesUrl, this);
    }
  }, {
    key: 'backup',
    value: function backup() {
      return (0, _backupMedia2.default)(this.sensesUrl);
    }
  }]);

  return User;
}();

exports.default = User;