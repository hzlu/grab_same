import fs from 'fs';
import path from 'path';
import axios from 'axios';

const baseURL = 'https://v2.same.com';
const channelId = 1061178;
const channelUrl = `/channel/${channelId}/senses`;

const downloadDir = path.resolve(__dirname, `../download/channel_${channelId}`);
// 保证目录存在
try {
  fs.statSync(downloadDir);
} catch (e) {
  fs.mkdirSync(downloadDir);
}

const downloadImage = ({ url, createdAt }) => {
  /* eslint-disable no-console */
  console.log(`begin to download: ${url}`);
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get',
      responseType: 'stream',
    })
      .then((response) => {
        const stream = response.data.pipe(fs.createWriteStream(`${downloadDir}/${createdAt}.jpg`));
        stream.on('finish', () => {
          /* eslint-disable no-console */
          console.log(`finish download: ${url}`);
          resolve();
        });
      })
      .catch(err => reject(err));
  });
};

const parallelDownload = async (photos) => {
  for (const photo of photos) {
    await downloadImage(photo);
  }
};

const main = (url) => {
  axios({
    url,
    method: 'get',
    baseURL,
    headers: {
      'X-Same-Request-ID': 'b25a97d-2e44-49a3-b420-27fff52ae660',
      'X-same-Client-Version': '593',
      'X-same-Device-UUID': 'd:3527982323924',
      'PACKAGE-NAME': 'com.same.android',
      'User-Agent': 'same/593',
      'Advertising-UUID': 'd:3527982323924',
    },
  }).then((response) => {
    if (response.status === 200) {
      const { results, next } = response.data.data;
      const photos = results.filter(r => !!r.photo && r.user.sex === 0)
        .map(r => ({
          url: r.photo,
          createdAt: r.created_at,
        }));

      parallelDownload(photos)
        .then(() => {
          if (next) {
            /* eslint-disable no-console */
            console.log('begin next');
            main(next);
          } else {
            /* eslint-disable no-console */
            console.log('no next');
          }
        });
    } else {
      /* eslint-disable no-console */
      console.log('channel api fail!!!');
    }
  });
};

main(channelUrl);
