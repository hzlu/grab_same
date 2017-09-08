'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let entity;

const usage = () => {
  /* eslint-disable no-console */
  console.log(`
使用方法：

*) 搜索频道 c/channel -s <name>
*) 查看频道 c/channel -i <id>
*) 频道内容 c/channel -c <id>
*) 备份频道 c/channel -b <id>
*) 查看用户 u/user -i <id>
*) 用户内容 u/user -c <id>
*) 备份用户 u/user -b <id>
*) 更多内容 n/next/m/more
*) 退出     q/quit
*) 帮助     h/help
  `);
};

const handleChannel = (() => {
  var _ref = _asyncToGenerator(function* (option, value) {
    if (option === '-i') {
      entity = new _channel2.default(value);
      yield entity.detail();
    } else if (option === '-c') {
      entity = new _channel2.default(value);
      yield entity.senses();
    } else if (option === '-b') {
      entity = new _channel2.default(value);
      yield entity.backup();
    } else if (option === '-s') {
      yield _channel2.default.search(value);
    } else {
      usage();
    }
  });

  return function handleChannel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const handleUser = (() => {
  var _ref2 = _asyncToGenerator(function* (option, value) {
    if (option === '-i') {
      entity = new _user2.default(value);
      yield entity.detail();
    } else if (option === '-c') {
      entity = new _user2.default(value);
      yield entity.senses();
    } else if (option === '-b') {
      entity = new _user2.default(value);
      yield entity.backup();
    } else {
      usage();
    }
  });

  return function handleUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const handleNext = (() => {
  var _ref3 = _asyncToGenerator(function* () {
    /* eslint-disable no-console */
    console.log('加载更多内容...');
    yield entity.senses();
  });

  return function handleNext() {
    return _ref3.apply(this, arguments);
  };
})();

const rl = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('hello same > ');

rl.on('line', input => {
  rl.pause();
  const argv = input.trim().split(/\s+/);
  switch (argv[0]) {
    case 'c':
    case 'channel':
      handleChannel(argv[1], argv[2]).then(() => rl.resume());
      break;
    case 'u':
    case 'user':
      handleUser(argv[1], argv[2]).then(() => rl.resume());
      break;
    case 'n':
    case 'next':
    case 'm':
    case 'more':
      handleNext().then(() => rl.resume());
      break;
    case 'q':
    case 'quit':
      rl.close();
      break;
    default:
      usage();
      rl.resume();
  }
});

rl.on('resume', () => {
  rl.prompt();
});

exports.default = rl;