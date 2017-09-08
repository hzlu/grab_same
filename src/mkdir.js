import fs from 'fs';

const mkdir = (dir) => {
  if (fs.existsSync(dir)) return true;

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
      fs.statSync(current);
    } catch (e) {
      fs.mkdirSync(current);
    }
    i += 1;
  }
  return true;
};

export default mkdir;
