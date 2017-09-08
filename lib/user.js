'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _backupMedia = require('./backupMedia');

var _backupMedia2 = _interopRequireDefault(_backupMedia);

var _fetchSame = require('./fetchSame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = class {
  constructor(userId) {
    this.userId = userId;
    this.profileUrl = `/user/${userId}/profile`;
    this.sensesUrl = `/user/${userId}/senses`;
    this.nextSenses = '';
  }

  setNext(next) {
    this.nextSenses = next;
  }

  detail() {
    return (0, _fetchSame.printUserProfile)(this.profileUrl);
  }

  senses() {
    return (0, _fetchSame.printSenses)(this.nextSenses || this.sensesUrl, this);
  }

  backup() {
    return (0, _backupMedia2.default)(this.sensesUrl);
  }
};

exports.default = User;