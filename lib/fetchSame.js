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

const baseURL = 'https://v2.same.com';
const headers = {
  'X-Same-Request-ID': 'a21d817f-d0a1-491e-9094-4cc3106ad73b',
  'X-same-Client-Version': '593',
  'X-same-Device-UUID': 'd:3527982323924',
  'PACKAGE-NAME': 'com.same.android',
  'User-Agent': 'same/593',
  'Advertising-UUID': 'd:3527982323924',
  Authorization: 'Token 1498622484-RRGVIp61gJXcGlEk-1123919'
};

const mydateFormat = timestamp => (0, _dateformat2.default)(new Date(timestamp * 1000), 'yyyy-mm-dd HH:MM:ss');

const sexAlias = sex => sex === 0 ? '女' : '男';

const fetchSame = url => {
  const promise = new Promise((resolve, reject) => {
    (0, _axios2.default)({
      url,
      baseURL,
      headers,
      method: 'get'
    }).then(response => {
      if (response.status === 200 && response.data.code === 0) {
        resolve(response.data.data);
      }
      reject(Error(`‼️   Fetch ${url} Fail`));
    }).catch(err => reject(err));
  });
  return promise;
};

exports.default = fetchSame;
const searchChannel = exports.searchChannel = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    const { results } = yield fetchSame(url);
    const table = new _cliTable2.default({
      head: ['频道ID', '频道名', '内容数']
    });

    results.forEach(function (result) {
      const { id, name, times } = result;
      table.push([id, name, times]);
    });

    // if (next) {
    //   table.push([{ content: '还有更多频道...', colSpan: 3, hAlign: 'center' }]);
    // }

    /* eslint-disable no-console */
    console.log(table.toString());
  });

  return function searchChannel(_x) {
    return _ref.apply(this, arguments);
  };
})();

const printChannelDetail = exports.printChannelDetail = (() => {
  var _ref2 = _asyncToGenerator(function* (url) {
    const data = yield fetchSame(url);
    const {
      id,
      name,
      times,
      description,
      created_at,
      user
    } = data;

    const table = new _cliTable2.default({
      head: [{ content: '频道信息', colSpan: 4, hAlign: 'center' }]
    });

    table.push(['频道', name, '频道ID', id], ['频道主', user.username, '频道主ID', user.id], ['创建时间', mydateFormat(created_at), '内容数目', times], ['频道简介', { content: description, colSpan: 3 }]);

    /* eslint-disable no-console */
    console.log(table.toString());
    return Promise.resolve();
  });

  return function printChannelDetail(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const printUserProfile = exports.printUserProfile = (() => {
  var _ref3 = _asyncToGenerator(function* (url) {
    const { user } = yield fetchSame(url);
    const {
      id,
      username,
      avatar,
      created_at,
      sex,
      email,
      mobile,
      senses,
      channels
    } = user;

    const table = new _cliTable2.default({
      head: [{ content: '用户信息', colSpan: 4, hAlign: 'center' }]
    });

    table.push(['昵称', username, '用户ID', id], ['性别', sexAlias(sex), '加入时间', mydateFormat(created_at)], ['电话', mobile, 'E-mail', email], ['发布数目', senses, '加入频道数', channels], ['头像URL', { content: avatar, colSpan: 3 }]);

    /* eslint-disable no-console */
    console.log(table.toString());
    return Promise.resolve();
  });

  return function printUserProfile(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const printSenses = exports.printSenses = (() => {
  var _ref4 = _asyncToGenerator(function* (url, entity) {
    const { results, next } = yield fetchSame(url);

    const table = new _cliTable2.default({
      head: [{ content: '内容列表', colSpan: 8, hAlign: 'center' }],
      colWidths: [10, 20, 10, 25, 10, 20, 10, 20]
    });

    results.forEach(function (result) {
      const {
        id,
        txt,
        created_at,
        photo,
        likes,
        views,
        user,
        channel,
        media
      } = result;

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
    return Promise.resolve();
  });

  return function printSenses(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
})();