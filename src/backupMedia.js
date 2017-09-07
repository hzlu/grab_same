import fs from 'fs';
import path from 'path';
import axios from 'axios';
import fetchSame from './fetchSame';

const downloadDir = path.resolve(__dirname, '../download');

// TODO Recursive mkdir
try {
  fs.statSync(downloadDir);
} catch (e) {
  fs.mkdirSync(downloadDir);
}

const downloadImage = ({ photo: url, created_at: createdAt }) => {
  /* eslint-disable no-console */
  console.log(`begin to download: ${url}`);

  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get',
      responseType: 'stream',
    })
      .then((response) => {
        const stream = response.data
          .pipe(fs.createWriteStream(`${downloadDir}/${createdAt}.jpg`));
        stream.on('finish', () => {
          /* eslint-disable no-console */
          console.log('finish download');
          resolve();
        });
      })
      .catch(err => reject(err));
  });
};

const parallelDownload = async (photos) => {
  const promises = photos.map(photo => downloadImage(photo));
  return Promise.all(promises);
};

const backupMedia = (url) => {
  fetchSame(url)
    .then((data) => {
      const { results, next } = data;
      const photos = results.filter(r => !!r.photo && r.user.sex === 0);

      parallelDownload(photos)
        .then(() => {
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

export default backupMedia;
