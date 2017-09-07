import readline from 'readline';
import Channel from './channel';
import User from './user';

let channel, user;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('hello same > ');

rl.on('line', (input) => {
  const argv = input.trim().split(/\s+/);
  switch(argv[0]) {
    case 'c':
    case 'channel':
      handleChannel(argv[1], argv[2]);
      break;
    case 'u':
    case 'user':
      handleUser(argv[1], argv[2]);
      break;
    case 'n':
    case 'next':
      break;
    case 'q':
    case 'quit':
      rl.close();
      break;
    default:
      usage();
  }
  rl.prompt();
});

const handleChannel = async (option, value) => {
  if (option === '-i') {
    channel = new Channel(value)
    channel.detail();
  } else if (option === '-c') {
    channel = new Channel(value)
    channel.senses();
  } else if (option === '-s') {
    Channel.search(value)
  } else {
    usage();
  }
};

const handleUser = (option, id) => {
  if (option === '-i') {
    user = new User(value)
    user.profile();
  } else if (option === '-c') {
    user = new User(value)
    user.senses();
  } else {
    usage();
  }
};

const usage = () => {
  console.log(`
使用方法：

*) 搜索频道 c/channel -s <name>
*) 查看频道 c/channel -i <id>
*) 频道内容 c/channel -c <id>
*) 查看用户 u/user -i <id>
*) 用户内容 u/user -c <id>
*) 翻页     n/next
*) 退出     q/quit
  `);
};

usage();
rl.prompt();
