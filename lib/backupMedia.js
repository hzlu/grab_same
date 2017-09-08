'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fetchSame = require('./fetchSame');

var _fetchSame2 = _interopRequireDefault(_fetchSame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var downloadDir = _path2.default.resolve(__dirname, '../download');

// TODO Recursive mkdir
try {
  _fs2.default.statSync(downloadDir);
} catch (e) {
  _fs2.default.mkdirSync(downloadDir);
}

var downloadImage = function downloadImage(_ref) {
  var url = _ref.photo,
      createdAt = _ref.created_at;

  /* eslint-disable no-console */
  console.log('begin to download: ' + url);

  return new Promise(function (resolve, reject) {
    (0, _axios2.default)({
      url: url,
      method: 'get',
      responseType: 'stream'
    }).then(function (response) {
      var stream = response.data.pipe(_fs2.default.createWriteStream(downloadDir + '/' + createdAt + '.jpg'));
      stream.on('finish', function () {
        /* eslint-disable no-console */
        console.log('finish download');
        resolve();
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var parallelDownload = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(photos) {
    var promises;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promises = photos.map(function (photo) {
              return downloadImage(photo);
            });
            return _context.abrupt('return', Promise.all(promises));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function parallelDownload(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var backupMedia = function backupMedia(url) {
  (0, _fetchSame2.default)(url).then(function (data) {
    var results = data.results,
        next = data.next;
    // const photos = results.filter(r => !!r.photo && r.user.sex === 0);

    var photos = results.filter(function (r) {
      return !!r.photo;
    });

    parallelDownload(photos).then(function () {
      if (next) {
        /* eslint-disable no-console */
        console.log('下一页...');
        backupMedia(next);
      } else {
        /* eslint-disable no-console */
        console.log('备份结束');
      }
    });
  });
};

exports.default = backupMedia;