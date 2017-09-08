'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mkdir = require('./mkdir');

var _mkdir2 = _interopRequireDefault(_mkdir);

var _fetchSame = require('./fetchSame');

var _fetchSame2 = _interopRequireDefault(_fetchSame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sameDir = _path2.default.resolve(_os2.default.homedir(), 'same_media');

const downloadMedia = ({ src: url, subDir, senseId }) => {
  const extname = _path2.default.extname(url);
  const downloadDir = _path2.default.resolve(sameDir, subDir);
  (0, _mkdir2.default)(downloadDir);

  /* eslint-disable no-console */
  console.log(`✈️  Begin  download ${url}`);

  return new Promise((resolve, reject) => {
    (0, _axios2.default)({
      url,
      method: 'get',
      responseType: 'stream'
    }).then(response => {
      const stream = response.data.pipe(_fs2.default.createWriteStream(`${downloadDir}/${senseId}${extname}`));
      stream.on('finish', () => {
        /* eslint-disable no-console */
        console.log('🍺  Finish download  ');
        resolve();
      });
    }).catch(err => reject(err));
  });
};

const parallelDownload = (() => {
  var _ref = _asyncToGenerator(function* (senses) {
    // for (const sense of senses) {
    //   await downloadMedia(sense);
    // }
    // return Promise.resolve();

    const promises = senses.map(function (sense) {
      return downloadMedia(sense);
    });
    const result = yield Promise.all(promises);
    return Promise.resolve(result);
  });

  return function parallelDownload(_x) {
    return _ref.apply(this, arguments);
  };
})();

const backupMedia = (() => {
  var _ref2 = _asyncToGenerator(function* (url) {
    const promise = new Promise(function (resolve, reject) {
      (0, _fetchSame2.default)(url).then(function (data) {
        const subDir = url.slice(1).split('/', 2).join('_');
        const { results, next } = data;
        const mediaSenses = results.map(function (r) {
          const {
            photo,
            media,
            id: senseId
          } = r;
          const src = photo || media && media.sound && media.sound.src || media && media.video && media.video.src;
          return { src, senseId, subDir };
        }).filter(function (item) {
          return !!item.src;
        });

        parallelDownload(mediaSenses).then(function () {
          if (next) {
            /* eslint-disable no-console */
            console.log('\nNext page ...\n');
            backupMedia(next);
          } else {
            /* eslint-disable no-console */
            console.log('Finish backup 🎉 ');
            resolve();
          }
        }).catch(function (err) {
          return reject(err);
        });
      }).catch(function (err) {
        return reject(err);
      });
    });
    return promise;
  });

  return function backupMedia(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

exports.default = backupMedia;