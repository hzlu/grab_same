'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _backupMedia = require('./backupMedia');

var _backupMedia2 = _interopRequireDefault(_backupMedia);

var _fetchSame = require('./fetchSame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Channel = function () {
  _createClass(Channel, null, [{
    key: 'search',
    value: function search(name) {
      var searchUrl = '/channel/search?query=' + _querystring2.default.escape(name);
      return (0, _fetchSame.searchChannel)(searchUrl);
    }
  }]);

  function Channel(channelId) {
    _classCallCheck(this, Channel);

    this.channelId = channelId;
    this.detailUrl = '/channel/' + channelId + '/detail';
    this.sensesUrl = '/channel/' + channelId + '/senses';
    this.nextSenses = '';
  }

  _createClass(Channel, [{
    key: 'setNext',
    value: function setNext(next) {
      this.nextSenses = next;
    }
  }, {
    key: 'detail',
    value: function detail() {
      return (0, _fetchSame.printChannelDetail)(this.detailUrl);
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

  return Channel;
}();

exports.default = Channel;