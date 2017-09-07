import readline from 'readline';
import Channel from './channel';
import User from './user';

let entity;

const usage = () => {
  /* eslint-disable no-console */
  console.log(`
使用方法：

*) 搜索频道 c/channel -s <name>
*) 查看频道 c/channel -i <id>
*) 频道内容 c/channel -c <id>
*) 查看用户 u/user -i <id>
*) 用户内容 u/user -c <id>
*) 更多内容 n/next/m/more
*) 退出     q/quit
*) 帮助     h/help
  `);
};

const handleChannel = async (option, value) => {
  if (option === '-i') {
    entity = new Channel(value);
    await entity.detail();
  } else if (option === '-c') {
    entity = new Channel(value);
    await entity.senses();
  } else if (option === '-s') {
    await Channel.search(value);
  } else {
    usage();
  }
};

const handleUser = async (option, value) => {
  if (option === '-i') {
    entity = new User(value);
    await entity.detail();
  } else if (option === '-c') {
    entity = new User(value);
    await entity.senses();
  } else {
    usage();
  }
};

const handleNext = async () => {
  /* eslint-disable no-console */
  console.log('加载更多内容...');
  await entity.senses();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('hello same > ');

rl.on('line', (input) => {
  rl.pause();
  const argv = input.trim().split(/\s+/);
  switch (argv[0]) {
    case 'c':
    case 'channel':
      handleChannel(argv[1], argv[2])
        .then(() => rl.resume());
      break;
    case 'u':
    case 'user':
      handleUser(argv[1], argv[2])
        .then(() => rl.resume());
      break;
    case 'n':
    case 'next':
    case 'm':
    case 'more':
      handleNext()
        .then(() => rl.resume());
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

rl.prompt();
