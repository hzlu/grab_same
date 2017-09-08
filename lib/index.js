'use strict';

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var entity = void 0;

var usage = function usage() {
  /* eslint-disable no-console */
  console.log('\n\u4F7F\u7528\u65B9\u6CD5\uFF1A\n\n*) \u641C\u7D22\u9891\u9053 c/channel -s <name>\n*) \u67E5\u770B\u9891\u9053 c/channel -i <id>\n*) \u9891\u9053\u5185\u5BB9 c/channel -c <id>\n*) \u5907\u4EFD\u9891\u9053 c/channel -b <id>\n*) \u67E5\u770B\u7528\u6237 u/user -i <id>\n*) \u7528\u6237\u5185\u5BB9 u/user -c <id>\n*) \u5907\u4EFD\u7528\u6237 u/user -b <id>\n*) \u66F4\u591A\u5185\u5BB9 n/next/m/more\n*) \u9000\u51FA     q/quit\n*) \u5E2E\u52A9     h/help\n  ');
};

var handleChannel = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(option, value) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(option === '-i')) {
              _context.next = 6;
              break;
            }

            entity = new _channel2.default(value);
            _context.next = 4;
            return entity.detail();

          case 4:
            _context.next = 24;
            break;

          case 6:
            if (!(option === '-c')) {
              _context.next = 12;
              break;
            }

            entity = new _channel2.default(value);
            _context.next = 10;
            return entity.senses();

          case 10:
            _context.next = 24;
            break;

          case 12:
            if (!(option === '-b')) {
              _context.next = 18;
              break;
            }

            entity = new _channel2.default(value);
            _context.next = 16;
            return entity.backup();

          case 16:
            _context.next = 24;
            break;

          case 18:
            if (!(option === '-s')) {
              _context.next = 23;
              break;
            }

            _context.next = 21;
            return _channel2.default.search(value);

          case 21:
            _context.next = 24;
            break;

          case 23:
            usage();

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function handleChannel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var handleUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(option, value) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(option === '-i')) {
              _context2.next = 6;
              break;
            }

            entity = new _user2.default(value);
            _context2.next = 4;
            return entity.detail();

          case 4:
            _context2.next = 19;
            break;

          case 6:
            if (!(option === '-c')) {
              _context2.next = 12;
              break;
            }

            entity = new _user2.default(value);
            _context2.next = 10;
            return entity.senses();

          case 10:
            _context2.next = 19;
            break;

          case 12:
            if (!(option === '-b')) {
              _context2.next = 18;
              break;
            }

            entity = new _user2.default(value);
            _context2.next = 16;
            return entity.backup();

          case 16:
            _context2.next = 19;
            break;

          case 18:
            usage();

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function handleUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var handleNext = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            /* eslint-disable no-console */
            console.log('加载更多内容...');
            _context3.next = 3;
            return entity.senses();

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function handleNext() {
    return _ref3.apply(this, arguments);
  };
}();

var rl = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('hello same > ');

rl.on('line', function (input) {
  rl.pause();
  var argv = input.trim().split(/\s+/);
  switch (argv[0]) {
    case 'c':
    case 'channel':
      handleChannel(argv[1], argv[2]).then(function () {
        return rl.resume();
      });
      break;
    case 'u':
    case 'user':
      handleUser(argv[1], argv[2]).then(function () {
        return rl.resume();
      });
      break;
    case 'n':
    case 'next':
    case 'm':
    case 'more':
      handleNext().then(function () {
        return rl.resume();
      });
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

rl.on('resume', function () {
  rl.prompt();
});

rl.prompt();