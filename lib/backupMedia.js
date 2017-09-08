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

const downloadDir = _path2.default.resolve(__dirname, '../download');

// TODO Recursive mkdir
try {
  _fs2.default.statSync(downloadDir);
} catch (e) {
  _fs2.default.mkdirSync(downloadDir);
}

const downloadImage = ({ photo: url, created_at: createdAt }) => {
  /* eslint-disable no-console */
  console.log(`begin to download: ${url}`);

  return new Promise((resolve, reject) => {
    (0, _axios2.default)({
      url,
      method: 'get',
      responseType: 'stream'
    }).then(response => {
      const stream = response.data.pipe(_fs2.default.createWriteStream(`${downloadDir}/${createdAt}.jpg`));
      stream.on('finish', () => {
        /* eslint-disable no-console */
        console.log('finish download');
        resolve();
      });
    }).catch(err => reject(err));
  });
};

const parallelDownload = (() => {
  var _ref = _asyncToGenerator(function* (photos) {
    const promises = photos.map(function (photo) {
      return downloadImage(photo);
    });
    return Promise.all(promises);
  });

  return function parallelDownload(_x) {
    return _ref.apply(this, arguments);
  };
})();

const backupMedia = url => {
  (0, _fetchSame2.default)(url).then(data => {
    const { results, next } = data;
    // const photos = results.filter(r => !!r.photo && r.user.sex === 0);
    const photos = results.filter(r => !!r.photo);

    parallelDownload(photos).then(() => {
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