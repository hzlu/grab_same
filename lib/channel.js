'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _backupMedia = require('./backupMedia');

var _backupMedia2 = _interopRequireDefault(_backupMedia);

var _fetchSame = require('./fetchSame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Channel = class {
  static search(name) {
    const searchUrl = `/channel/search?query=${_querystring2.default.escape(name)}`;
    return (0, _fetchSame.searchChannel)(searchUrl);
  }

  constructor(channelId) {
    this.channelId = channelId;
    this.detailUrl = `/channel/${channelId}/detail`;
    this.sensesUrl = `/channel/${channelId}/senses`;
    this.nextSenses = '';
  }

  setNext(next) {
    this.nextSenses = next;
  }

  detail() {
    return (0, _fetchSame.printChannelDetail)(this.detailUrl);
  }

  senses() {
    return (0, _fetchSame.printSenses)(this.nextSenses || this.sensesUrl, this);
  }

  backup() {
    return (0, _backupMedia2.default)(this.sensesUrl);
  }
};

exports.default = Channel;