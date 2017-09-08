'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printSenses = exports.printUserProfile = exports.printChannelDetail = exports.searchChannel = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _cliTable = require('cli-table2');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var baseURL = 'https://v2.same.com';
var headers = {
  'X-Same-Request-ID': 'a21d817f-d0a1-491e-9094-4cc3106ad73b',
  'X-same-Client-Version': '593',
  'X-same-Device-UUID': 'd:3527982323924',
  'PACKAGE-NAME': 'com.same.android',
  'User-Agent': 'same/593',
  'Advertising-UUID': 'd:3527982323924',
  Authorization: 'Token 1498622484-RRGVIp61gJXcGlEk-1123919'
};

var mydateFormat = function mydateFormat(timestamp) {
  return (0, _dateformat2.default)(new Date(timestamp * 1000), 'yyyy-mm-dd HH:MM:ss');
};

var sexAlias = function sexAlias(sex) {
  return sex === 0 ? '女' : '男';
};

var fetchSame = function fetchSame(url) {
  var promise = new Promise(function (resolve, reject) {
    (0, _axios2.default)({
      url: url,
      baseURL: baseURL,
      headers: headers,
      method: 'get'
    }).then(function (response) {
      if (response.status === 200 && response.data.code === 0) {
        resolve(response.data.data);
      }
      reject(Error('\u203C\uFE0F   Fetch ' + url + ' Fail'));
    }).catch(function (err) {
      return reject(err);
    });
  });
  return promise;
};

exports.default = fetchSame;
var searchChannel = exports.searchChannel = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var _ref2, results, table;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchSame(url);

          case 2:
            _ref2 = _context.sent;
            results = _ref2.results;
            table = new _cliTable2.default({
              head: ['频道ID', '频道名', '内容数']
            });


            results.forEach(function (result) {
              var id = result.id,
                  name = result.name,
                  times = result.times;

              table.push([id, name, times]);
            });

            // if (next) {
            //   table.push([{ content: '还有更多频道...', colSpan: 3, hAlign: 'center' }]);
            // }

            /* eslint-disable no-console */
            console.log(table.toString());

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchChannel(_x) {
    return _ref.apply(this, arguments);
  };
}();

var printChannelDetail = exports.printChannelDetail = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    var data, id, name, times, description, created_at, user, table;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchSame(url);

          case 2:
            data = _context2.sent;
            id = data.id, name = data.name, times = data.times, description = data.description, created_at = data.created_at, user = data.user;
            table = new _cliTable2.default({
              head: [{ content: '频道信息', colSpan: 4, hAlign: 'center' }]
            });


            table.push(['频道', name, '频道ID', id], ['频道主', user.username, '频道主ID', user.id], ['创建时间', mydateFormat(created_at), '内容数目', times], ['频道简介', { content: description, colSpan: 3 }]);

            /* eslint-disable no-console */
            console.log(table.toString());
            return _context2.abrupt('return', Promise.resolve());

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function printChannelDetail(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var printUserProfile = exports.printUserProfile = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
    var _ref5, user, id, username, avatar, created_at, sex, email, mobile, senses, channels, table;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetchSame(url);

          case 2:
            _ref5 = _context3.sent;
            user = _ref5.user;
            id = user.id, username = user.username, avatar = user.avatar, created_at = user.created_at, sex = user.sex, email = user.email, mobile = user.mobile, senses = user.senses, channels = user.channels;
            table = new _cliTable2.default({
              head: [{ content: '用户信息', colSpan: 4, hAlign: 'center' }]
            });


            table.push(['昵称', username, '用户ID', id], ['性别', sexAlias(sex), '加入时间', mydateFormat(created_at)], ['电话', mobile, 'E-mail', email], ['发布数目', senses, '加入频道数', channels], ['头像URL', { content: avatar, colSpan: 3 }]);

            /* eslint-disable no-console */
            console.log(table.toString());
            return _context3.abrupt('return', Promise.resolve());

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function printUserProfile(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var printSenses = exports.printSenses = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url, entity) {
    var _ref7, results, next, table;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetchSame(url);

          case 2:
            _ref7 = _context4.sent;
            results = _ref7.results;
            next = _ref7.next;
            table = new _cliTable2.default({
              head: [{ content: '内容列表', colSpan: 8, hAlign: 'center' }],
              colWidths: [10, 20, 10, 25, 10, 20, 10, 20]
            });


            results.forEach(function (result) {
              var id = result.id,
                  txt = result.txt,
                  created_at = result.created_at,
                  photo = result.photo,
                  likes = result.likes,
                  views = result.views,
                  user = result.user,
                  channel = result.channel,
                  media = result.media;


              table.push(['发布人', user.username, '发布人ID', user.id, '发布频道', channel.name, '频道ID', channel.id], ['内容ID', id, '发布时间', mydateFormat(created_at), '浏览数', views, '同感数', likes]);
              if (txt) {
                table.push(['正文', { content: txt, colSpan: 7 }]);
              }
              if (photo) {
                table.push(['图片URL', { content: photo, colSpan: 7 }]);
              }
              if (media && media.sound) {
                table.push(['媒体资源', { content: media.sound.src, colSpan: 7 }]);
              }
              if (media && media.video) {
                table.push(['媒体资源', { content: media.video.src, colSpan: 7 }]);
              }
              table.push([{
                content: '☀️  🌤  ⛅️  🌥  🌦  🌈  ☁️   🌧  ⛈  🌩  🌨  ☃️  ⛄️  ❄️   🌬  💨  🌪  ☔️  ⭐️',
                colSpan: 8,
                hAlign: 'center'
              }]);
            });

            if (next) {
              table.push([{ content: '还有更多内容...', colSpan: 8, hAlign: 'center' }]);
              entity.setNext(next);
            }

            /* eslint-disable no-console */
            console.log(table.toString());
            return _context4.abrupt('return', Promise.resolve());

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function printSenses(_x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}();