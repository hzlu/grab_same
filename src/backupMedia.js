import fs from 'fs';
import os from 'os';
import path from 'path';
import axios from 'axios';
import mkdir from './mkdir';
import fetchSame from './fetchSame';

const sameDir = path.resolve(os.homedir(), 'same_media');

const downloadMedia = ({ src: url, subDir, senseId }) => {
  const extname = path.extname(url);
  const downloadDir = path.resolve(sameDir, subDir);
  mkdir(downloadDir);

  /* eslint-disable no-console */
  console.log(`✈️  Begin  download ${url}`);

  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get',
      responseType: 'stream',
    })
      .then((response) => {
        const stream = response.data
          .pipe(fs.createWriteStream(`${downloadDir}/${senseId}${extname}`));
        stream.on('finish', () => {
          /* eslint-disable no-console */
          console.log('🍺  Finish download  ');
          resolve();
        });
      })
      .catch(err => reject(err));
  });
};

const parallelDownload = async (senses) => {
  // for (const sense of senses) {
  //   await downloadMedia(sense);
  // }
  // return Promise.resolve();

  const promises = senses.map(sense => downloadMedia(sense));
  const result = await Promise.all(promises);
  return Promise.resolve(result);
};

const backupMedia = async (url) => {
  const promise = new Promise((resolve, reject) => {
    fetchSame(url)
      .then((data) => {
        const subDir = url.slice(1).split('/', 2).join('_');
        const { results, next } = data;
        const mediaSenses = results
          .map((r) => {
            const {
              photo,
              media,
              id: senseId,
            } = r;
            const src = photo
              || (media && media.sound && media.sound.src)
              || (media && media.video && media.video.src);
            return { src, senseId, subDir };
          })
          .filter(item => !!item.src);

        parallelDownload(mediaSenses)
          .then(() => {
            if (next) {
              /* eslint-disable no-console */
              console.log('\nNext page ...\n');
              backupMedia(next);
            } else {
              /* eslint-disable no-console */
              console.log('Finish backup 🎉 ');
              resolve();
            }
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
  return promise;
};

export default backupMedia;
