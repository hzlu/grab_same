'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mkdir = dir => {
  if (_fs2.default.existsSync(dir)) return true;

  let sep;
  let i;

  if (process.platform === 'win32') {
    sep = '\\';
    i = 1;
  } else {
    sep = '/';
    i = 0;
  }

  const segments = dir.split(sep);
  let current = segments[0];

  while (i < segments.length) {
    current = `${current}${sep}${segments[i]}`;
    try {
      _fs2.default.statSync(current);
    } catch (e) {
      _fs2.default.mkdirSync(current);
    }
    i += 1;
  }
  return true;
};

exports.default = mkdir;